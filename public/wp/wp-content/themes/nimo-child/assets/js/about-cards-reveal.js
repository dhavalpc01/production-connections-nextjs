/**
 * About (Home 01) — staggered card reveal.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * `.a1_card_trigger_elm` (tx-about view-1.php) wraps each of the three cards
 * next to the section copy — on the Service Detail page this is "The Truth"
 * section's checkmark cards. The class name reads like a scroll-animation
 * hook, but nothing in nimo-core.js ever binds to it: grepping the theme and
 * nimo-core plugin for `card_trigger` only turns up `.s2_card_trigger_elm`,
 * a DIFFERENT widget (Services-2) with its own pin-and-scroll-jack effect
 * built for a full-height, one-card-per-screen showcase. `.a1_card_trigger_elm`
 * itself is dead markup — the cards just sit in a plain CSS column with a
 * `nth-child` offset, no entrance animation at all.
 *
 * This gives the About-1 cards a lightweight entrance of their own: fade up,
 * staggered one after another, the first time the card column scrolls into
 * view. It deliberately does NOT copy the Services-2 pin/scroll-jack —
 * that scroll-jacks the whole page and reserves extra viewport heights per
 * card, which fits a full showcase section, not three cards sitting beside a
 * column of body copy.
 *
 * Loaded on is_singular('services') only, after gsap-min and
 * scrollTrigger-min — see inc/enqueue.php.
 *
 * NOT USED ON THE INDUSTRY DETAIL PAGES, which carry the same component for
 * their §4. ScrollTrigger is unreliable there — measured, `st.scroll()` returns
 * 0 against a real `scrollY` of 1400 until something calls
 * `ScrollTrigger.update()` — and a hide-first GSAP entrance in that environment
 * fails toward cards that never reappear. Those pages use
 * assets/js/industry-card-reveal.js, which does the same thing with an
 * IntersectionObserver. If this file is ever changed, check whether that one
 * should change with it.
 *
 * THIS IS ONLY HALF OF WHAT MAKES THE RAIL WORK on either family. The cards are
 * also `position: sticky` and stack as you scroll, and that is killed by the
 * Elementor `page_overflow` control writing `overflow: hidden` onto
 * `.page-wrapper`; section 12b of service-detail.css and section 5d of
 * industry-detail.css each revive it. If the cards fade in but do not stack,
 * that is the bug to look at, not this file.
 *
 * @package nimo-child
 */

( function () {
	'use strict';

	if ( 'undefined' === typeof gsap || 'undefined' === typeof ScrollTrigger ) {
		return;
	}

	var wrap = document.querySelector( '.nm-about-1-card-wrap' );
	var cards = document.querySelectorAll( '.nm-about-1-card-wrap .a1_card_trigger_elm' );

	if ( ! wrap || ! cards.length ) {
		return;
	}

	if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
		return;
	}

	gsap.set( cards, { autoAlpha: 0, y: 60 } );

	gsap.to( cards, {
		autoAlpha: 1,
		y: 0,
		duration: 0.7,
		ease: 'power2.out',
		stagger: 0.18,
		scrollTrigger: {
			trigger: wrap,
			start: 'top 85%',
			toggleActions: 'play none none reverse',
		},
	} );
}() );
