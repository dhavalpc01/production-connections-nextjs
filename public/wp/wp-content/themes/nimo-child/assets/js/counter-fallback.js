/**
 * Guarantee the stat counters end on their real number.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The parent theme animates `.counter` with jquery.counterup
 * (`nimo/assets/js/counterup.min.js`, wired up at `nimo-core.js:1346`). The
 * plugin works like this:
 *
 *   1. a Waypoint fires when the element scrolls into view;
 *   2. it reads the target out of the element's own text ("100");
 *   3. it IMMEDIATELY writes `"0"` into the element;
 *   4. it then walks a chain of `setTimeout`s back up to the target.
 *
 * Step 3 is the problem. The real number only exists in the markup until the
 * Waypoint fires, and from that moment the displayed value depends entirely on
 * a timer chain completing. If anything interrupts it — a background tab, a
 * throttled timer, the element being re-rendered between ticks, or counterUp
 * being initialised a second time (on the second pass it reads "0" as the
 * target and dutifully counts 0 -> 0) — the counter is left showing **0**, with
 * no way to recover the number, because the source of truth was overwritten.
 *
 * That is what "Happy Clients: 0" is. The database is fine: all 14 service pages
 * store 100, and the home page stores 390 / 90 / 15. Nothing needed fixing in
 * the content.
 *
 * WHAT THIS DOES
 * --------------
 * Two things, neither of which fights the animation:
 *
 *   1. Snapshots each counter's target BEFORE counterUp can overwrite it, into
 *      `data-pc-counter-target`. This script is enqueued in the footer with NO
 *      dependencies, so it executes during parse — before jQuery's ready event,
 *      and therefore before counterUp is even initialised.
 *
 *   2. Watches each counter for changes and, once its value has stopped moving,
 *      compares what is on screen against the snapshot — writing the target back
 *      if they differ.
 *
 * When the animation works, the values already match and this changes nothing —
 * it is a repair, not a replacement. When it does not, the number is correct
 * instead of zero.
 *
 * WHY A MutationObserver AND NOT A ONE-SHOT TIMER. The first version of this
 * file repaired once, on a timer started when the counter scrolled into view.
 * That leaves a hole: counterUp fires on its own Waypoint, and if it zeroes the
 * element AFTER that single window has passed, nothing is left watching and the
 * counter stays on 0 permanently. Reacting to the value actually changing closes
 * it — whenever the number moves, the settle timer restarts, so the check always
 * lands after counterUp has finished with the element, whenever that happens to
 * be.
 *
 * It cannot loop: the repair writes the target, that write is itself a mutation,
 * the next check finds the value already equal to the target, and it stops.
 *
 * @package nimo-child
 */
( function () {
	'use strict';

	var ATTR = 'data-pc-counter-target';

	// counterUp's own timing: `time: 400` over `delay: 10` steps. Wait comfortably
	// past that before judging the result, so a slow-but-working animation is
	// never cut short and rewritten mid-count.
	var SETTLE_MS = 1500;

	/**
	 * Read a counter's numeric text, preserving any thousands separators.
	 *
	 * @param {Element} el The counter element.
	 * @return {string} Trimmed text content.
	 */
	function readValue( el ) {
		return ( el.textContent || '' ).trim();
	}

	/**
	 * Is this string a number the plugin would have animated?
	 *
	 * counterUp only animates plain integers and decimals, optionally with
	 * commas. Anything else it leaves alone, so this script must too.
	 *
	 * @param {string} value Candidate value.
	 * @return {boolean} True when counterUp would treat it as a number.
	 */
	function isAnimatable( value ) {
		return /^[0-9]+(,[0-9]{3})*(\.[0-9]+)?$/.test( value );
	}

	var counters = [].slice.call( document.querySelectorAll( '.counter' ) );

	if ( ! counters.length ) {
		return;
	}

	// 1. Snapshot, before anything else has run.
	counters.forEach( function ( el ) {
		var value = readValue( el );

		// A target of "0" is either genuinely zero or counterUp already got here.
		// Either way there is nothing to restore, so do not record it — recording
		// it would bake the broken state in on the next page view.
		if ( isAnimatable( value ) && '0' !== value ) {
			el.setAttribute( ATTR, value );
		}
	} );

	/**
	 * Put the target back if the animation did not get there.
	 *
	 * @param {Element} el The counter element.
	 * @return {void}
	 */
	function repair( el ) {
		var target = el.getAttribute( ATTR );

		if ( ! target ) {
			return;
		}

		if ( readValue( el ) !== target ) {
			el.textContent = target;
		}
	}

	// 2. Repair whenever a counter's value stops moving.
	counters.forEach( function ( el ) {

		if ( ! el.hasAttribute( ATTR ) ) {
			return;
		}

		var timer = null;

		/**
		 * (Re)start the settle timer. Each new value pushes the check further out,
		 * so it only ever runs once the number has been still for SETTLE_MS.
		 *
		 * @return {void}
		 */
		function schedule() {
			window.clearTimeout( timer );
			timer = window.setTimeout( function () {
				repair( el );
			}, SETTLE_MS );
		}

		if ( 'MutationObserver' in window ) {
			new MutationObserver( schedule ).observe( el, {
				childList: true,
				characterData: true,
				subtree: true,
			} );
		}

		// Also check once after load, for the case where counterUp never runs at
		// all: no mutation ever fires, so nothing above would schedule a check.
		// The value is already correct there, so this is a no-op that simply
		// proves it.
		if ( 'complete' === document.readyState ) {
			schedule();
		} else {
			window.addEventListener( 'load', schedule );
		}
	} );
}() );
