/**
 * Industry Detail — scroll-triggered reveals that GSAP cannot be trusted with.
 *
 * ONE of them now: §4's card rail entrance.
 *
 * §5b's statement used to warm from grey to white here. The client asked for the
 * animation off that component entirely, so `initStatement()` is gone and
 * section 5e of assets/css/industry-detail.css also neutralises the theme's own
 * `wa-split-up2` on it. Both halves are needed — removing only this one would
 * have left the GSAP SplitText reveal still running.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * §4 is `tx_about` style_1, whose rail wraps each card in `.a1_card_trigger_elm`.
 * The class name reads like a scroll-animation hook and nothing in nimo-core.js
 * ever binds to it — grepping the theme and the plugin for `card_trigger` only
 * finds `.s2_card_trigger_elm`, a different widget with its own pin-and-scroll-
 * jack effect. So the cards had no entrance at all: they simply appeared,
 * already in place, as the section scrolled past. That is what was reported.
 *
 * WHY NOT REUSE about-cards-reveal.js, which does exactly this for the service
 * pages. Because it drives the effect from a GSAP ScrollTrigger, and on this page
 * family ScrollTrigger is the unreliable part. Measured on the built page:
 * `ScrollTrigger.getAll()` reports 40 triggers, and the scroll position they read
 * does not track the document — `st.scroll()` returned 0 against a real
 * `window.scrollY` of 1400, and the trigger only reached `isActive` after a
 * manual `ScrollTrigger.update()`. That is the same failure assets/js/
 * reveal-fallback.js was written to repair (~39 elements a page), and its header
 * records the likely causes: a ~14,000px document, 31 images between the
 * triggers, and Lenis smooth scrolling rather than native.
 *
 * A hide-first GSAP entrance in that environment fails toward cards that never
 * come back. An IntersectionObserver has no cached geometry to go stale, so it
 * fails toward nothing at all.
 *
 * WHAT MAKES THIS SAFE WITH SCRIPTING OFF
 * ---------------------------------------
 * The hidden state lives on `.pc-card-reveal`, a class this script adds to the
 * WRAP before it observes anything. The stylesheet hides cards only inside that
 * class, so with JavaScript disabled — or if this file 404s, or throws before it
 * runs — the class is never added and the cards render complete. Nothing here
 * hides anything the CSS cannot un-hide on its own.
 *
 * That is the opposite of the WOW.js / GSAP pattern this page is otherwise full
 * of, which writes `visibility: hidden` inline at init and needs a whole fallback
 * file to guarantee it is ever cleared.
 *
 * BELT AND BRACES ANYWAY: `.a1_card_trigger_elm` is also listed in
 * reveal-fallback.js's SELECTOR, so if the observer somehow never fires the
 * cards are forced visible after that file's grace period. The two are
 * independent — this one animates, that one only ever reveals.
 *
 * REDUCED MOTION short-circuits the whole thing: the class is never added, so
 * the cards are simply there. The stylesheet says the same in its own section 13
 * for the same reason.
 *
 * @package nimo-child
 */
( function () {
	'use strict';

	/**
	 * Delay between one card's entrance and the next, in milliseconds.
	 *
	 * Applied as an inline `transition-delay` rather than as separate CSS classes
	 * so the rail keeps working if a fourth card is ever added — the stagger is
	 * computed from the card's index, not enumerated in the stylesheet.
	 */
	var STAGGER_MS = 180;

	/**
	 * How much of a card must be on screen before it is considered arrived.
	 *
	 * Deliberately low, and shared by both reveals. The cards are
	 * `position: sticky` and up to 318px tall, and the statement is up to 274px
	 * on a phone; a taller-than-viewport element would never reach a high
	 * threshold — it would scroll from below the fold to above it without any
	 * single moment where most of it is visible.
	 */
	var THRESHOLD = 0.15;

	function init() {
		var wrap = document.querySelector( '.nm-about-1-card-wrap' );

		if ( ! wrap ) {
			return;
		}

		var cards = wrap.querySelectorAll( '.a1_card_trigger_elm' );

		if ( ! cards.length ) {
			return;
		}

		if (
			window.matchMedia &&
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		) {
			return;
		}

		/*
		 * No IntersectionObserver means no way to time the entrance, and an
		 * untimed entrance is worse than none — the cards would animate on load,
		 * far above the fold, and be static by the time anyone reached them.
		 * Leaving the class off renders them complete.
		 */
		if ( ! ( 'IntersectionObserver' in window ) ) {
			return;
		}

		wrap.classList.add( 'pc-card-reveal' );

		var observer = new IntersectionObserver( function ( entries ) {
			entries.forEach( function ( entry ) {
				if ( ! entry.isIntersecting ) {
					return;
				}

				entry.target.classList.add( 'is-revealed' );

				// One-way. Re-hiding on scroll-up would flicker the sticky stack.
				observer.unobserve( entry.target );
			} );
		}, { threshold: THRESHOLD } );

		Array.prototype.forEach.call( cards, function ( card, i ) {
			card.style.transitionDelay = ( i * STAGGER_MS ) + 'ms';
			observer.observe( card );
		} );
	}

	function boot() {
		init();
	}

	if ( 'loading' === document.readyState ) {
		document.addEventListener( 'DOMContentLoaded', boot );
	} else {
		boot();
	}
}() );
