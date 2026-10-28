/**
 * Make every body CTA on an Industry Detail page the hero's button.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Seven CTAs sit in the body of these pages and only two of them — §1 hero and
 * §4 opener, both `nm-pr-btn-1 has-v2` — actually animate. Section 23 of
 * assets/css/industry-detail.css had already unified the SHAPE of the other
 * five, so at rest all seven read as one component: gold 100px pill, 42px dark
 * disc, same padding. What it could not unify is the BEHAVIOUR, because the
 * hero's behaviour is not styling on a class — it is a DOM shape:
 *
 *   .icon  holds TWO arrow glyphs. nimo-core.css:1481 parks the first at
 *          translateX(-50px) and leaves the second at 0; on hover they slide to
 *          0 and +50px, so one arrow flies out right as another flies in left.
 *          One arrow in the box means nothing to swap with.
 *   .text  is EMPTY, and carries data-front / data-back. nimo-core.css:1495
 *          prints both through `content: attr()` on ::before and ::after and
 *          rolls them vertically past each other on hover. A span with real
 *          text in it has nothing to roll.
 *
 * So this rewrites those five buttons into that shape and then gets out of the
 * way. Every transition, easing curve and hover colour still comes from
 * `.nm-pr-btn-1:is(.has-v2)` in the parent theme (nimo-core.css:1447-1549).
 * Nothing here reimplements an animation, which is the point: the hero stays the
 * single definition, and this file only makes the other five eligible for it.
 *
 * THE FIVE, AND WHY NOT THE OTHER TWO
 * -----------------------------------
 *   §3  quick     .nm-pr-btn-4
 *   §6  solve     .pc-problem-grid__btn
 *   §7  coverage  .pc-service-index__btn
 *   §9  outcome   .nm-pr-btn-5.has-white   (scoped to .nm-about-5-area)
 *   §13 closer    .nm-pr-btn-5             (scoped to .nm-hero-5-area)
 *
 * The header "Contact Us" (`nm-pr-btn-2`) and the footer button
 * (`nm-pr-btn-4.nm-footer-4-btn`) are deliberately excluded — they are site
 * chrome, identical on every page of the site, and changing them here would make
 * the industry pages the odd ones out rather than the consistent ones.
 *
 * `nm-pr-btn-5` is scoped to its two areas rather than matched globally for the
 * reason section 23 already documented: it is also the pricing card's button,
 * and §8 IS the pricing component.
 *
 * FOUR THINGS MEASURED IN THE RUNNING PAGE THAT SHAPE THE CODE
 * ------------------------------------------------------------
 * 1. THE PAINT CLASSES COME OFF; THE LAYOUT CLASSES STAY. This is the decision
 *    the whole file turns on, and it was made after reading what actually paints
 *    the hero. It is NOT nimo-core: the brand's Customizer CSS (scoped by
 *    inc/custom-css-scope.php) overrides both of the rules that matter —
 *
 *        body:not(.pc-engine-service) .nm-pr-btn-1        background #D29737
 *        body:not(.pc-engine-service) .nm-pr-btn-1 .icon  black disc, white glyph
 *
 *    — so `.nm-pr-btn-1` is the key the brand look hangs on, and nimo-core's own
 *    `var(--nm-clr-black-3)` pill never renders on this site.
 *
 *    That makes the goal simple: a converted button should BE an `nm-pr-btn-1`,
 *    not resemble one. So `nm-pr-btn-4`, `nm-pr-btn-5` and `has-white` — which
 *    are paint and nothing else — are REMOVED, and the button then picks up the
 *    hero's colours, hover inversion and every future brand override for free,
 *    with no value restated anywhere in the child theme to drift out of sync.
 *
 *    `pc-problem-grid__btn` and `pc-service-index__btn` are KEPT, because those
 *    two are not only paint: pc-components.css:200 places §6's button in its grid
 *    (`grid-column: 2; grid-row: 3`). Their paint is switched off at the source
 *    instead, with a `:not(.pcid-cta)` guard on the two rules in that file.
 *
 * 2. `nm-pr-btn-4` HAS BOUND JS THAT CANNOT BE UNBOUND — BUT CAN BE ORPHANED.
 *    nimo-core.js:1929 binds mouseenter/mouseleave that GSAP-animate `.icon`
 *    (left, rotation: -45) and `.text` (x: -35), writing INLINE styles that beat
 *    any stylesheet. Script order on the page is jquery -> wow -> gsap ->
 *    nimo-core -> child, so those handlers are already bound before this file
 *    runs and removeEventListener has nothing to name.
 *
 *    It does not matter, because the handlers captured `.icon` and `.text` as
 *    NODE REFERENCES at bind time. This replaces both children, so the old
 *    handlers keep tweening two detached nodes forever and nothing on screen
 *    moves. That is also why the <a> itself is never cloned: cloning would
 *    unbind them, but it would also drop the pending `wow fadeInUp2` reveal —
 *    WOW has boxed 33 elements on this page and run only 3 of them by this
 *    point, so a clone below the fold would never appear at all.
 *
 * 3. THE THEME'S MAGNETIC BINDING IS A ONE-TIME SNAPSHOT.
 *    nimo-core.js:1227 does querySelectorAll('.wa_magnetic_btn_2') at DOM ready
 *    and binds what it finds. Adding the class afterwards binds nothing, so the
 *    disc-follows-cursor effect is ported here (same strength 30, same
 *    elastic.out(1, 0.3), same 1s duration) and attached ONLY to buttons this
 *    file converted. §1 and §4 already have the theme's own handler; binding a
 *    second one to them would make two tweens fight over one transform.
 *
 * 4. AN EMPTY .text HAS NO ACCESSIBLE NAME. The visible label comes from CSS
 *    `content: attr(data-front)`, which assistive tech does not reliably
 *    announce — the theme's own hero view compensates with an aria-label. So the
 *    label is harvested and written to aria-label BEFORE the span is blanked. A
 *    button that ends up nameless is a worse outcome than one that does not
 *    animate, so conversion is abandoned for any button whose label cannot be
 *    read.
 *
 * Idempotent: anything already carrying `nm-pr-btn-1` is skipped, so this can
 * run twice without doubling arrows, and §1 and §4 are untouched by definition.
 */
( function () {
	'use strict';

	/**
	 * The five body CTAs. Header and footer chrome is excluded by selector, not
	 * by a later filter, so the exclusion is visible at the point of matching.
	 */
	var SELECTOR = [
		'.nm-pr-btn-4:not(.nm-footer-4-btn)',
		'.pc-problem-grid__btn',
		'.pc-service-index__btn',
		'.nm-about-5-area .nm-pr-btn-5',
		'.nm-hero-5-area .nm-pr-btn-5'
	].join( ',' );

	/** The glyph the hero uses, for buttons that draw their arrow as inline SVG. */
	var DEFAULT_GLYPH = 'fas fa-long-arrow-right';

	/** Ported verbatim from nimo-core.js:1227 so the disc feels identical. */
	var MAGNET_STRENGTH = 30;
	var MAGNET_DURATION = 1;
	var MAGNET_EASE = 'elastic.out(1, 0.3)';

	if ( ! document.body || ! document.body.classList.contains( 'pc-industry-detail' ) ) {
		return;
	}

	/**
	 * Read the button's label before the span that holds it is discarded.
	 *
	 * Falls back to the anchor's own text because §6 and §7 wrap their label in a
	 * `.text` span while a future CTA might not, and to aria-label last because
	 * that is the one place a label can already live.
	 *
	 * @param {HTMLAnchorElement} btn Button being converted.
	 * @return {string} The label, or '' if there is none to find.
	 */
	function readLabel( btn ) {
		var span = btn.querySelector( '.text' );
		var text = span ? span.textContent : btn.textContent;

		if ( ! text || ! text.trim() ) {
			text = btn.getAttribute( 'aria-label' ) || '';
		}

		return text.trim();
	}

	/**
	 * The glyph classes to put on both arrows.
	 *
	 * Taken from the button's own icon when it has one, so §3 and §9/§13 keep
	 * whatever arrow the widget was configured with rather than being forced to
	 * the hero's. §6 and §7 draw an SVG instead of an <i> and get the default.
	 *
	 * @param {HTMLAnchorElement} btn Button being converted.
	 * @return {string} Class string for the <i> elements.
	 */
	function readGlyph( btn ) {
		var existing = btn.querySelector( '.icon i' );
		var glyph = existing ? existing.className.trim() : '';

		return glyph || DEFAULT_GLYPH;
	}

	/**
	 * Build the hero's `.icon` — two stacked arrows, which is what makes the
	 * slide-swap on hover possible at all.
	 *
	 * @param {string} glyph Class string for each arrow.
	 * @return {HTMLSpanElement} The icon node.
	 */
	function buildIcon( glyph ) {
		var icon = document.createElement( 'span' );
		var i;
		var arrow;

		icon.className = 'icon wa_magnetic_btn_2_elm';

		for ( i = 0; i < 2; i++ ) {
			arrow = document.createElement( 'i' );
			arrow.className = glyph;
			arrow.setAttribute( 'aria-hidden', 'true' );
			icon.appendChild( arrow );
		}

		return icon;
	}

	/**
	 * Build the hero's `.text` — deliberately empty, with the label in data
	 * attributes for the ::before / ::after to print and roll.
	 *
	 * @param {string} label The button's label.
	 * @return {HTMLSpanElement} The text node.
	 */
	function buildText( label ) {
		var text = document.createElement( 'span' );

		text.className = 'text';
		text.setAttribute( 'data-front', label );
		text.setAttribute( 'data-back', label );

		return text;
	}

	/**
	 * Rewrite one button into the hero's shape.
	 *
	 * Order matters in two places. The label is read and written to aria-label
	 * before anything is replaced, because after replacement it is gone. And the
	 * hero classes go on last, so the button is never in a state where it claims
	 * `nm-pr-btn-1` while still holding the old markup.
	 *
	 * @param {HTMLAnchorElement} btn Button to convert.
	 * @return {boolean} Whether it was converted.
	 */
	function convert( btn ) {
		var label;

		if ( btn.classList.contains( 'nm-pr-btn-1' ) ) {
			return false;
		}

		label = readLabel( btn );

		// A nameless button is worse than an unanimated one. Leave it alone.
		if ( ! label ) {
			return false;
		}

		btn.setAttribute( 'aria-label', label );

		// Replaces the nodes nm-pr-btn-4's bound handlers hold references to.
		btn.replaceChildren( buildIcon( readGlyph( btn ) ), buildText( label ) );

		// Paint-only classes, and they outrank `.nm-pr-btn-1` by source order.
		btn.classList.remove( 'nm-pr-btn-4', 'nm-pr-btn-5', 'has-white' );
		btn.classList.add( 'nm-pr-btn-1', 'has-v2', 'wa_magnetic_btn_2', 'pcid-cta' );

		return true;
	}

	/**
	 * Attach the disc-follows-cursor effect the theme's snapshot missed.
	 *
	 * A port of nimo-core.js:1227-1260, not a call into it — that code exposes no
	 * re-scan and lives inside a jQuery ready closure.
	 *
	 * @param {HTMLAnchorElement} btn A converted button.
	 * @return {void}
	 */
	function bindMagnet( btn ) {
		var disc = btn.querySelector( '.wa_magnetic_btn_2_elm' );

		if ( ! disc ) {
			return;
		}

		btn.addEventListener( 'mousemove', function ( event ) {
			var box = btn.getBoundingClientRect();

			window.gsap.to( disc, {
				x: ( ( event.clientX - box.left ) / btn.offsetWidth - 0.5 ) * MAGNET_STRENGTH,
				y: ( ( event.clientY - box.top ) / btn.offsetHeight - 0.5 ) * MAGNET_STRENGTH,
				duration: MAGNET_DURATION,
				ease: MAGNET_EASE
			} );
		} );

		btn.addEventListener( 'mouseout', function () {
			window.gsap.to( disc, {
				x: 0,
				y: 0,
				duration: MAGNET_DURATION,
				ease: MAGNET_EASE
			} );
		} );
	}

	var buttons = document.querySelectorAll( SELECTOR );
	var converted = [];
	var magnetic;

	Array.prototype.forEach.call( buttons, function ( btn ) {
		if ( convert( btn ) ) {
			converted.push( btn );
		}
	} );

	// The arrow swap and label roll are CSS and honour the media query on their
	// own; only the cursor-following disc has to opt out here.
	// gsap's global is an object, not a function — check the method actually used.
	magnetic = !! window.gsap && 'function' === typeof window.gsap.to &&
		! window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	if ( magnetic ) {
		converted.forEach( bindMagnet );
	}
}() );
