/**
 * Contact form validation and attribution capture.
 *
 * Two jobs, both on top of Contact Form 7 rather than instead of it:
 *
 *   1. Inline validation. CF7 validates on the server and reports errors after
 *      a round trip, which on a slow connection means filling in a long form,
 *      waiting, and then being told the email address was wrong. This checks
 *      the same rules as the field loses focus and again before submitting, so
 *      the correction happens while the visitor is still looking at the field.
 *
 *   2. UTM capture. Campaign parameters land on whichever page the ad points
 *      at, and the visitor usually clicks through to a service page before
 *      filling anything in — by then the query string is gone. These are
 *      stashed on arrival and written into the hidden inputs at submit time,
 *      so the CRM can tell which campaign produced the lead.
 *
 * The server re-checks everything here. This layer is a courtesy to the
 * visitor, never the gate: anything that skips the JS is still rejected by
 * CF7 and by inc/supabase/capture.php.
 */
( function () {
	'use strict';

	var UTM_KEYS = [ 'source', 'medium', 'campaign', 'term', 'content' ];
	var STORE_PREFIX = 'pcAttr_';

	/**
	 * sessionStorage, but never fatal.
	 *
	 * Safari in private mode used to throw on write, and any browser can have
	 * storage disabled outright. Attribution is nice to have; a form that
	 * cannot be submitted is not, so every access is guarded.
	 */
	function remember( key, value ) {
		try {
			if ( value && ! window.sessionStorage.getItem( STORE_PREFIX + key ) ) {
				window.sessionStorage.setItem( STORE_PREFIX + key, value );
			}
		} catch ( e ) {}
	}

	function recall( key ) {
		try {
			return window.sessionStorage.getItem( STORE_PREFIX + key ) || '';
		} catch ( e ) {
			return '';
		}
	}

	/**
	 * Record the campaign parameters and the referrer, first touch wins.
	 *
	 * First touch rather than last: the ad that brought someone to the site is
	 * the one that earned the lead, not whatever internal link they happened
	 * to arrive on the contact page from.
	 */
	function captureAttribution() {
		var params = new URLSearchParams( window.location.search );

		UTM_KEYS.forEach( function ( key ) {
			var value = params.get( 'utm_' + key );
			if ( value ) {
				remember( 'utm_' + key, value.slice( 0, 255 ) );
			}
		} );

		// An empty referrer means a direct visit; storing it would overwrite
		// nothing useful but would also mask a real referrer on a later page.
		if ( document.referrer && document.referrer.indexOf( window.location.host ) === -1 ) {
			remember( 'referrer', document.referrer.slice( 0, 2000 ) );
		}
	}

	/**
	 * Copy what we stored into a form's hidden inputs.
	 */
	function fillHiddenFields( form ) {
		UTM_KEYS.forEach( function ( key ) {
			var input = form.querySelector( '[name="pc-utm-' + key + '"]' );
			if ( input && ! input.value ) {
				input.value = recall( 'utm_' + key );
			}
		} );

		var ref = form.querySelector( '[name="pc-referrer"]' );
		if ( ref && ! ref.value ) {
			ref.value = recall( 'referrer' );
		}
	}

	/**
	 * Compile a shared pattern, once, and remember the result.
	 *
	 * The pattern strings come from PHP (inc/form-rules.php) and are written to
	 * be valid in both engines under the `u` flag. If one ever is not, this
	 * returns null and the check is skipped rather than throwing and taking the
	 * whole submit handler down with it — a broken rule must not become a form
	 * nobody can submit.
	 */
	var compiled = {};

	function regex( pattern, flags ) {
		var key = flags + ':' + pattern;

		if ( ! ( key in compiled ) ) {
			try {
				compiled[ key ] = new RegExp( pattern, flags );
			} catch ( e ) {
				compiled[ key ] = null;
			}
		}

		return compiled[ key ];
	}

	/**
	 * Which rule applies to this input?
	 *
	 * Resolved the same way the server does it: the form's CF7 id gives the
	 * field map, the field name gives the column, the column gives the rule.
	 * Returns null for inputs no rule covers, which are left to CF7.
	 */
	function ruleFor( field ) {
		var config = window.PC_FORM_RULES;

		if ( ! config || ! field.form ) {
			return null;
		}

		var idInput = field.form.querySelector( '[name="_wpcf7"]' );
		var map = idInput ? config.fields[ idInput.value ] : null;
		var column = map ? map[ field.name ] : null;

		return column ? config.rules[ column ] || null : null;
	}

	/**
	 * Validate one field.
	 *
	 * Runs the same checks in the same order as pc_form_validate_value() in
	 * PHP, and returns the message PHP would have returned — the strings come
	 * from the exported table rather than being written out again here, so the
	 * two can never word the same failure differently.
	 *
	 * The server re-runs all of it regardless. This exists so the visitor finds
	 * out while they are still looking at the field.
	 */
	function validateField( field ) {
		var value = ( field.value || '' ).trim();
		var required = field.getAttribute( 'aria-required' ) === 'true' || field.required;

		if ( required && ! value ) {
			return field.tagName === 'TEXTAREA' ? 'Please tell us a little about what you need.' : 'This field is required.';
		}

		if ( ! value ) {
			return '';
		}

		var config = window.PC_FORM_RULES;
		var rule = ruleFor( field );

		if ( ! rule || ! config ) {
			return '';
		}

		var msg = rule.messages || {};
		var i;

		for ( i = 0; i < ( rule.deny || [] ).length; i++ ) {
			var name = rule.deny[ i ];
			var denyRe = config.deny[ name ] ? regex( config.deny[ name ], 'iu' ) : null;

			if ( denyRe && denyRe.test( value ) ) {
				return msg[ name ] || '';
			}
		}

		// Array.from, not .length: an emoji is two UTF-16 code units, and
		// counting those would call a five-character name too long.
		var length = Array.from( value ).length;

		if ( rule.min && length < rule.min ) {
			return msg.min || '';
		}

		if ( rule.max && length > rule.max ) {
			return msg.max || '';
		}

		if ( rule.pattern ) {
			var shape = regex( rule.pattern, 'u' );

			if ( shape && ! shape.test( value ) ) {
				return msg.pattern || '';
			}
		}

		if ( rule.min_digits ) {
			var digits = ( value.match( /[0-9]/g ) || [] ).length;

			if ( digits < rule.min_digits || digits > rule.max_digits ) {
				return msg.digits || '';
			}
		}

		if ( rule.min_letters ) {
			var letters = regex( '\\p{L}', 'gu' );
			var found = letters ? ( value.match( letters ) || [] ).length : rule.min_letters;

			if ( found < rule.min_letters ) {
				return msg.letters || '';
			}
		}

		if ( rule.max_links ) {
			var urlRe = regex( config.deny.url, 'giu' );

			if ( urlRe && ( value.match( urlRe ) || [] ).length > rule.max_links ) {
				return msg.links || '';
			}
		}

		if ( rule.max_repeat ) {
			var repeat = regex( '(.)\\1{' + ( rule.max_repeat - 1 ) + ',}', 'u' );

			if ( repeat && repeat.test( value ) ) {
				return msg.repeat || '';
			}
		}

		return '';
	}

	/**
	 * Is this field sitting on a dark panel?
	 *
	 * The forms appear on a black service-page panel, inside a near-white
	 * popup, and on the dark CTA bands, and no single red clears WCAG AA
	 * against both ends of that range — the maths does not allow it, so the
	 * error colour has to depend on what it is drawn on.
	 *
	 * Selecting on the wrapper class was the first attempt and was wrong in
	 * both directions: the service panel does not carry any of the "dark"
	 * class names but is pure black, and the popup theme that looked dark by
	 * name renders on #f9f9f9. Measuring the actual background is the only
	 * version that cannot drift when a panel is restyled.
	 *
	 * Cached per field: the answer cannot change between keystrokes, and the
	 * ancestor walk is not worth repeating on every input event.
	 */
	function isOnDark( field ) {
		if ( field.dataset.pcOnDark !== undefined ) {
			return field.dataset.pcOnDark === '1';
		}

		var el = field;
		var luminance = 1; // Assume light: the safer default of the two.

		while ( el && el !== document.documentElement ) {
			var colour = getComputedStyle( el ).backgroundColor;
			var parts = colour && colour.match( /rgba?\(([^)]+)\)/ );

			if ( parts ) {
				var bits = parts[ 1 ].split( ',' ).map( parseFloat );
				var alpha = bits.length > 3 ? bits[ 3 ] : 1;

				if ( alpha > 0.5 ) {
					luminance = relativeLuminance( bits[ 0 ], bits[ 1 ], bits[ 2 ] );
					break;
				}
			}

			el = el.parentElement;
		}

		var dark = luminance < 0.35;
		field.dataset.pcOnDark = dark ? '1' : '0';

		return dark;
	}

	/**
	 * WCAG relative luminance, so the threshold above means something.
	 */
	function relativeLuminance( r, g, b ) {
		var channel = function ( value ) {
			var v = value / 255;
			return v <= 0.03928 ? v / 12.92 : Math.pow( ( v + 0.055 ) / 1.055, 2.4 );
		};

		return 0.2126 * channel( r ) + 0.7152 * channel( g ) + 0.0722 * channel( b );
	}

	/**
	 * Show or clear the message under a field.
	 *
	 * Errors are announced with aria-describedby and aria-invalid rather than
	 * colour alone, so they reach a screen reader and survive a colour-blind
	 * reader too.
	 */
	function renderError( field, message ) {
		var id = field.id || field.name;
		var errorId = 'pc-err-' + id;
		var node = field.parentNode.querySelector( '#' + CSS.escape( errorId ) );

		if ( ! message ) {
			if ( node ) {
				node.remove();
			}
			field.removeAttribute( 'aria-invalid' );
			field.classList.remove( 'pc-field-invalid', 'pc-field-invalid--on-dark' );
			return;
		}

		var onDark = isOnDark( field );

		if ( ! node ) {
			node = document.createElement( 'span' );
			node.className = 'pc-field-error' + ( onDark ? ' pc-field-error--on-dark' : '' );
			node.id = errorId;
			node.setAttribute( 'role', 'alert' );
			field.parentNode.insertBefore( node, field.nextSibling );
		}

		node.textContent = message;
		field.setAttribute( 'aria-invalid', 'true' );
		field.setAttribute( 'aria-describedby', errorId );
		field.classList.add( 'pc-field-invalid' );
		field.classList.toggle( 'pc-field-invalid--on-dark', onDark );
	}

	function fieldsOf( form ) {
		return Array.prototype.slice.call(
			form.querySelectorAll( 'input.wpcf7-form-control, textarea.wpcf7-form-control, select.wpcf7-form-control' )
		).filter( function ( field ) {
			return [ 'submit', 'hidden', 'button' ].indexOf( field.type ) === -1;
		} );
	}

	function validateForm( form ) {
		var firstBad = null;

		fieldsOf( form ).forEach( function ( field ) {
			var message = validateField( field );
			renderError( field, message );

			if ( message && ! firstBad ) {
				firstBad = field;
			}
		} );

		if ( firstBad ) {
			firstBad.focus();
			return false;
		}

		return true;
	}

	function initForm( form ) {
		if ( form.dataset.pcBound ) {
			return;
		}
		form.dataset.pcBound = '1';

		fillHiddenFields( form );

		fieldsOf( form ).forEach( function ( field ) {
			// Validate on blur, then live once it is already showing an error —
			// nagging someone mid-word before they have finished typing is
			// worse than saying nothing.
			field.addEventListener( 'blur', function () {
				renderError( field, validateField( field ) );
			} );

			field.addEventListener( 'input', function () {
				if ( field.classList.contains( 'pc-field-invalid' ) ) {
					renderError( field, validateField( field ) );
				}
			} );
		} );
	}

	function init() {
		captureAttribution();
		document.querySelectorAll( 'form.wpcf7-form' ).forEach( initForm );
	}

	/**
	 * Block an invalid submit.
	 *
	 * Listening on document in the capture phase, so this runs before CF7's own
	 * handler on the form and can stop the request before it is made.
	 */
	document.addEventListener(
		'submit',
		function ( event ) {
			var form = event.target;

			if ( ! form || ! form.classList || ! form.classList.contains( 'wpcf7-form' ) ) {
				return;
			}

			fillHiddenFields( form );

			if ( ! validateForm( form ) ) {
				event.preventDefault();
				event.stopImmediatePropagation();
			}
		},
		true
	);

	// Clear the inline errors once CF7 accepts the submission, otherwise stale
	// messages sit under a form that has just been reset.
	document.addEventListener( 'wpcf7mailsent', function ( event ) {
		fieldsOf( event.target ).forEach( function ( field ) {
			renderError( field, '' );
		} );
	} );

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
