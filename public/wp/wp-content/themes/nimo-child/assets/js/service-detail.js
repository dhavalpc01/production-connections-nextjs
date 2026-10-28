/**
 * Service Detail — keep the services section's reserved height in sync.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The Our Services section reserves vertical space with a wrapper whose height
 * the theme sets from JavaScript (themes/nimo/assets/js/nimo-core.js):
 *
 *     function setDynamicHeight() {
 *         wa_height_set.style.height = wa_height_get.offsetHeight + "px";
 *     }
 *     setDynamicHeight();
 *     window.addEventListener("resize", setDynamicHeight);
 *
 * It reads offsetHeight synchronously inside the resize handler, before the
 * browser has reflowed to the new width, so it captures the PREVIOUS
 * breakpoint's height. The two layouts differ enormously:
 *
 *     <= 991px   items stack   (grid-template-columns: auto)  ~826px each
 *     >= 992px   items collapse (height: 64px)                 64px each
 *
 * Carrying the stacked height into the desktop layout leaves a huge empty band
 * mid-page. Measured on this page, 768px -> 1440px:
 *
 *     .wa_height_set  height: 3304px   (stale)
 *     .wa_height_get  offsetHeight 705px
 *     section         3658px instead of 1059px  ->  2,599px of dead space
 *
 * It fires on device rotation, window resize and mobile browser chrome
 * show/hide. A fresh load at a fixed width is correct, which is why it only
 * shows up after the viewport changes.
 *
 * WHAT THIS DOES
 * --------------
 * Re-applies the theme's OWN formula at moments when the measurement is
 * actually valid — never a different calculation, so there is nothing to keep
 * in sync with the theme. A ResizeObserver on the source element is the real
 * fix: it fires after layout, and also catches content-driven changes (late
 * images, web fonts) that the resize event misses entirely.
 *
 * The parent's fixed height does not constrain the child, so measuring the
 * source while the target is sized is safe. The write is still guarded to
 * fire only on a real change, so the observer can never feed itself.
 *
 * Loaded on is_singular('services') only — see inc/enqueue.php.
 *
 * @package nimo-child
 */

( function () {
	'use strict';

	var target = document.querySelector( '.wa_height_set' );
	var source = document.querySelector( '.wa_height_get' );

	if ( ! target || ! source ) {
		return;
	}

	var frame = null;

	/**
	 * Apply the theme's formula. Runs inside a frame callback, so the layout it
	 * measures is the one about to be painted.
	 */
	function apply() {
		frame = null;

		var height = source.offsetHeight + 'px';

		if ( target.style.height !== height ) {
			target.style.height = height;
		}
	}

	/**
	 * Coalesce bursts of events into a single measurement.
	 */
	function schedule() {
		if ( null !== frame ) {
			window.cancelAnimationFrame( frame );
		}

		frame = window.requestAnimationFrame( apply );
	}

	// Late images and web fonts change the stacked height after DOM ready.
	window.addEventListener( 'load', schedule );

	// Rotation does not always emit a usable resize on mobile browsers.
	window.addEventListener( 'orientationchange', schedule );

	if ( 'undefined' !== typeof window.ResizeObserver ) {
		new window.ResizeObserver( schedule ).observe( source );
	} else {
		// Safari < 13.1 and friends: the resize event, measured a frame later.
		window.addEventListener( 'resize', schedule );
	}

	schedule();
}() );
