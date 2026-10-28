/**
 * Guarantee that scroll-revealed content on an Industry Detail page ends visible.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Three independent reveal mechanisms gate content on these pages, and every one
 * of them HIDES FIRST and reveals later:
 *
 *   1. WOW.js (`nimo/assets/js/wow-min.js`) walks every `.wow` box at init and
 *      writes `visibility: hidden; animation-name: none` INLINE on it, clearing
 *      that when the box scrolls into view. There are 39 on the professional
 *      services page.
 *   2. GSAP SplitText breaks `.wa-split-up` / `.wa-split-up2` headings into 45-54
 *      line and character spans, offsets them inside overflow-hidden wrappers,
 *      and tweens them back on a ScrollTrigger.
 *   3. `wa_add_class` adds `.active` on load to reveal copy.
 *   4. assets/js/industry-card-reveal.js holds §4's three `.a1_card_trigger_elm`
 *      cards at `opacity: 0` until an IntersectionObserver fires. Unlike the
 *      three above it is written to fail open — its hidden state is scoped to a
 *      class the script itself adds — so it is covered here only as a backstop.
 *
 * If a trigger never fires, the element is left hidden or half-revealed — and
 * "half-revealed" is the ugly one, because a split heading shows only its last
 * line. That is what shipped on /industries/professional-services/:
 * "What We Do For Professional Services Firms" rendered as "ms", and
 * "One team. All of it pointed at your kind of client" as "of client.".
 *
 * WHY THE TRIGGERS FAIL HERE. Not diagnosed to a single cause, and deliberately
 * not guessed at: ScrollTrigger measures start/end positions at init, this page
 * is ~14,000px tall with 31 images above and between the triggers, and it scrolls
 * under Lenis (`html.lenis-smooth`) rather than natively. Any of those can leave
 * a trigger with stale coordinates. Rather than re-wire the theme's animation
 * pipeline — vendor code shared with every other page on the site — this repairs
 * the outcome.
 *
 * WHAT THIS DOES, AND WHAT IT REFUSES TO DO
 * -----------------------------------------
 * It only ever REVEALS. There is no code path here that hides anything, so the
 * worst case is an element that animates and then gets redundantly confirmed
 * visible. Where the animation works, nothing is touched and the motion plays in
 * full — this is a repair, not a replacement, the same contract as
 * counter-fallback.js in this directory.
 *
 * The grace period is what protects the animation. An element is given
 * GRACE_MS after it enters the viewport to reveal itself; only if it is STILL
 * hidden after that is it forced. A blanket "make everything visible" on load
 * would have defeated every entrance animation on the page, which is why the CSS
 * approach was rejected — see section 13 of assets/css/industry-detail.css.
 *
 * WHY IntersectionObserver AND a final sweep. The observer handles the normal
 * case precisely: repair is attempted exactly once per element, GRACE_MS after
 * that element is actually on screen, so it cannot mistake "not scrolled to yet"
 * for "broken". The sweep on `load` covers what the observer cannot: an element
 * that is never intersected because an ancestor is itself still collapsed, and
 * anything whose observer callback was throttled in a background tab.
 *
 * Reduced motion short-circuits the whole thing: if the reader has asked for less
 * motion, the end state is what they want, immediately. The stylesheet declares
 * the same thing for the same reason.
 *
 * NO no-JS BRANCH IS NEEDED. All three mechanisms hide with JavaScript — WOW via
 * inline styles, GSAP via inline transforms — and none has a CSS counterpart, so
 * with scripting off nothing is ever hidden and the page renders complete.
 *
 * @package nimo-child
 */
( function () {
	'use strict';

	/**
	 * How long an element gets to reveal itself after entering the viewport.
	 *
	 * Long enough to cover the theme's own entrance durations (the longest
	 * `wa-split` tween runs ~1.1s including its stagger) plus a margin, so a
	 * working animation is never cut short and re-forced mid-tween.
	 */
	var GRACE_MS = 1400;

	/**
	 * Elements that carry a reveal mechanism.
	 *
	 * BOTH SPELLINGS AND BOTH SEPARATORS ARE DELIBERATE. The theme names these
	 * trigger classes inconsistently — `wa-split-up2` with hyphens on §7's two
	 * headings, `wa_title_spilt_1` with underscores AND a misspelling of "split"
	 * on §13's. An earlier version of this file matched only `[class*="wa-split"]`
	 * and therefore silently skipped §13, which is one of the headings that was
	 * reported clipped in the first place.
	 */
	var SELECTOR = [
		'.wow',
		'.wa_add_class',
		'[class*="wa-split"]',
		'[class*="wa_split"]',
		'[class*="wa_title_split"]',
		'[class*="wa_title_spilt"]',
		/*
		 * §4's card rail. Not a theme trigger class — the theme never animates
		 * these — but assets/js/industry-card-reveal.js does, and it holds each
		 * card at `opacity: 0` until its IntersectionObserver fires.
		 *
		 * That script is already designed to fail open (its hidden state is
		 * scoped to a class the script itself adds, so nothing is hidden if it
		 * never runs), so this entry is redundant by design rather than
		 * load-bearing. It is here for the one case the script cannot cover
		 * itself: an observer callback throttled away in a background tab,
		 * leaving a card mid-transition. Costs one extra selector on a sweep
		 * that already runs.
		 */
		'.a1_card_trigger_elm'
	].join( ', ' );

	/**
	 * The pieces SplitText generates, matched STRUCTURALLY.
	 *
	 * Chasing trigger-class names is what let §13 through, so the sweep does not
	 * rely on them alone: whatever the host element happens to be called, a split
	 * heading always ends up with `.char` / `.word` / `.split-line` children, and
	 * those are the elements actually carrying the offset. Repairing them directly
	 * is both simpler and immune to the next naming variant.
	 *
	 * They do not exist at DOMContentLoaded — SplitText creates them — which is
	 * why they are swept on `load` rather than observed.
	 */
	var SPLIT_PIECES = '.char, .word, .split-line';

	/**
	 * How often to re-check.
	 *
	 * THERE IS NO STOP CONDITION, and that is a deliberate correction. An earlier
	 * version stopped after 30 seconds from load, on the assumption that the page
	 * has settled by then. It has not: this page is ~14,000px tall, so a reader
	 * scrolling at any normal pace reaches §13 minutes after load — long after a
	 * wall-clock budget from load would have expired. Measured exactly that way:
	 * sections at 900-4400px repaired correctly and everything below 6000px was
	 * left broken, purely because the budget ran out on the way down.
	 *
	 * The cost of running for the page's lifetime is one `querySelectorAll` over
	 * ~45 nodes plus a rect test per node, every 1.2s. That is far too cheap to be
	 * worth a stop condition, and the work is skipped entirely for anything not on
	 * screen.
	 */
	var TICK_MS = 1200;

	var reduceMotion = window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	/**
	 * Does this computed transform actually move the element?
	 *
	 * A finished GSAP tween leaves `matrix(1, 0, 0, 1, 0, 0)` rather than `none`,
	 * so testing against `none` alone treats every COMPLETED animation as broken.
	 * Harmless in effect, but it would mean the sweep rewrites hundreds of
	 * elements that were already correct, and it would fight any tween still in
	 * flight. Only a non-identity matrix is a real offset.
	 *
	 * @param {string} t Computed `transform`.
	 * @return {boolean} True when the transform displaces the element.
	 */
	function isOffset( t ) {
		if ( ! t || 'none' === t ) {
			return false;
		}

		return ! /^matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)$/.test( t ) &&
			! /^matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1\)$/.test( t );
	}

	/**
	 * Is this element visually suppressed right now?
	 *
	 * Deliberately does NOT test for zero size. A heading inside a collapsed
	 * ancestor measures 0x0 through no fault of its own, and "reveal" would be
	 * the wrong response — the ancestor is the thing that is stuck, and it is
	 * separately in the observer's set.
	 *
	 * @param {Element} el Element to test.
	 * @return {boolean} True when hidden by visibility or opacity.
	 */
	function isSuppressed( el ) {
		var cs = window.getComputedStyle( el );

		if ( 'hidden' === cs.visibility || 'collapse' === cs.visibility ) {
			return true;
		}

		return 0 === parseFloat( cs.opacity );
	}

	/**
	 * Make one element visible, whatever is suppressing it.
	 *
	 * DRIVEN BY THE COMPUTED VALUE, NOT BY WHAT IS INLINE, and that distinction is
	 * the whole point of this function. An earlier version only cleared properties
	 * that were ALREADY inline, on the assumption that the reveal mechanisms all
	 * write inline styles. Two of the three do. The third does not: nimo-core.css
	 * carries
	 *
	 *   .nm-hero-5-area .nm-hero-5-title          { opacity: 0 }
	 *   .nm-hero-5-area:is(.active) .nm-hero-5-title { opacity: 1 }
	 *
	 * so §13's heading is held at zero by a STYLESHEET and released by a class
	 * landing on its ancestor. There is no inline opacity to clear, so the old
	 * version repaired that heading's individual characters and left the <h2>
	 * itself at `opacity: 0` — the section rendered as a black band with correct,
	 * invisible text. DOM assertions passed (`innerText` counts text at zero
	 * opacity); only a screenshot showed it.
	 *
	 * Setting a plain inline value is enough — the theme's rule carries no
	 * `!important` — and staying non-important means a later hover or focus rule
	 * can still take over.
	 *
	 * Only properties that are actually wrong get touched, so an element that has
	 * finished animating is left exactly as the animation left it.
	 *
	 * @param {Element} el Element to un-hide.
	 * @return {void}
	 */
	function forceVisible( el ) {
		var cs = window.getComputedStyle( el );
		var s = el.style;

		var suppressed = 'hidden' === cs.visibility || 'collapse' === cs.visibility ||
			0 === parseFloat( cs.opacity );

		if ( 'hidden' === cs.visibility || 'collapse' === cs.visibility ) {
			s.visibility = 'visible';
		}

		if ( 0 === parseFloat( cs.opacity ) ) {
			s.opacity = '1';
		}

		/*
		 * THE ANIMATION ITSELF HAS TO GO, not just the properties it is holding.
		 *
		 * WOW reveals a box by assigning an animate.css keyframe (`fadeInRight2`
		 * and friends), every one of which starts at `opacity: 0`. While that
		 * animation is applied, the keyframed value WINS OVER AN INLINE STYLE — so
		 * setting `opacity: 1` inline does nothing at all for a box whose animation
		 * is stalled at frame 0. It has to be removed instead.
		 *
		 * Removing it is safe by the time this runs: an element only reaches here
		 * after GRACE_MS on screen, and the theme's entrance animations are 0.6s to
		 * 1s, so a healthy animation has already finished and removing it changes
		 * nothing. A stalled one is exactly what needs clearing.
		 *
		 * `animation-name: none` is also what WOW parks the property at BEFORE it
		 * assigns the real keyframe, so the same line covers both states.
		 */
		if ( suppressed && ( s.animationName || 'none' !== cs.animationName ) ) {
			s.setProperty( 'animation', 'none', 'important' );
		}

		/*
		 * AND THE TRANSITION, for the same reason one step removed.
		 *
		 * §13's heading is not held by a keyframe animation but by a `transition`
		 * on opacity, 800ms, triggered when `.active` lands. A transition whose
		 * clock has not advanced sits at `currentTime: 0` with `fill: backwards`,
		 * which pins the FROM value — opacity 0 — above any inline style. Setting
		 * `opacity: 1` inline is therefore ignored until the transition either
		 * finishes or is removed.
		 *
		 * Removing it is safe on the same grounds as the animation above: this runs
		 * GRACE_MS after the element came on screen, which is longer than the
		 * theme's 800ms, so a transition that is going to complete already has.
		 *
		 * Verified against a real stuck case rather than reasoned about: a document
		 * that never becomes visible (an automated browser, a tab opened in the
		 * background and restored) freezes transitions at time zero indefinitely,
		 * and this is what recovers the section.
		 */
		if ( suppressed && 'all 0s ease 0s' !== cs.transition ) {
			s.setProperty( 'transition', 'none', 'important' );
		}

		// GSAP's pre-tween offset.
		if ( isOffset( cs.transform ) ) {
			s.transform = 'none';
		}

		/*
		 * GSAP also writes these three as separate properties on newer versions,
		 * and a leftover `translate` survives `transform: none` on its own.
		 */
		if ( s.translate ) {
			s.removeProperty( 'translate' );
		}

		if ( s.rotate ) {
			s.removeProperty( 'rotate' );
		}

		if ( s.scale ) {
			s.removeProperty( 'scale' );
		}
	}

	/**
	 * Reveal an element and, for a split heading, its generated line spans.
	 *
	 * SplitText's offsets live on the GENERATED descendants, not on the heading,
	 * so revealing the heading alone would leave it looking identical. The
	 * descendants are only touched when they are themselves suppressed or
	 * transformed, so a heading that finished animating is left exactly as GSAP
	 * left it.
	 *
	 * @param {Element} el Element to reveal.
	 * @return {void}
	 */
	function reveal( el ) {
		forceVisible( el );

		if ( -1 === el.className.indexOf( 'split' ) &&
			-1 === el.className.indexOf( 'spilt' ) ) {
			return;
		}

		var kids = el.querySelectorAll( '*' );

		for ( var i = 0; i < kids.length; i++ ) {
			var kid = kids[ i ];
			var cs = window.getComputedStyle( kid );

			if ( isSuppressed( kid ) || isOffset( cs.transform ) ) {
				forceVisible( kid );
			}
		}
	}

	/**
	 * Repair one element if it is currently suppressed.
	 *
	 * NOT MARKED PERMANENTLY DONE, and that is a correction. The first version of
	 * this file stamped each element with a `data-` flag on its first check and
	 * skipped it forever after. That is wrong for two reasons found in testing:
	 *
	 *   - WOW.js runs with `live: true` and re-scans the document, so a box can be
	 *     hidden a SECOND time, after its one permitted check has passed.
	 *   - The `.active` class that gates §13 can be added and removed by the theme
	 *     independently of anything this file does.
	 *
	 * Either way a once-only check left content hidden with nothing watching. So
	 * repair is idempotent and re-runnable instead: it reads the CURRENT computed
	 * state every time and does nothing when there is nothing wrong, which makes
	 * calling it repeatedly cheap and safe.
	 *
	 * @param {Element} el Element to check.
	 * @return {boolean} True when something was changed.
	 */
	function repair( el ) {
		var changed = false;

		/*
		 * `wa_add_class` IS REPAIRED BY ADDING ITS OWN CLASS, not by overriding
		 * styles. That mechanism reveals by putting `.active` on the element and
		 * letting the theme's own CSS take it from there — §13's heading is gated
		 * exactly that way, by `.nm-hero-5-area:is(.active) .nm-hero-5-title`.
		 * Adding the class is the mechanism's real end state, and it releases every
		 * descendant the stylesheet keys off it in one move.
		 */
		if ( -1 !== el.className.indexOf( 'wa_add_class' ) &&
			! el.classList.contains( 'active' ) ) {
			el.classList.add( 'active' );
			unfreeze( el );
			changed = true;
		}

		var isSplit = -1 !== el.className.indexOf( 'split' ) ||
			-1 !== el.className.indexOf( 'spilt' );

		/*
		 * A split heading can be "visible" and still be wrong: the host is
		 * unsuppressed while its generated lines sit offset out of an
		 * overflow-hidden wrapper. So splits are always inspected.
		 */
		if ( isSuppressed( el ) || isSplit ) {
			reveal( el );
			changed = true;
		}

		return changed;
	}

	/**
	 * Let the cascade resolve, by removing transitions frozen at time zero.
	 *
	 * Adding `.active` is only half of the `wa_add_class` reveal. The theme pairs
	 * it with rules like
	 *
	 *   .nm-hero-5-area .nm-hero-5-disc            { opacity: 0 }
	 *   .nm-hero-5-area:is(.active) .nm-hero-5-disc { opacity: 1 }
	 *
	 * and an 800ms `transition` between them. A transition whose clock never
	 * advances sits at `currentTime: 0` with `fill: backwards`, pinning the FROM
	 * value above both the cascade and any inline style — so the class lands, the
	 * winning rule says `opacity: 1`, and the element stays invisible anyway.
	 *
	 * REMOVING THE TRANSITION RATHER THAN FORCING opacity IS THE POINT. It hands
	 * the decision back to the stylesheet instead of overriding it, so this reveals
	 * exactly what the cascade says should now be visible and nothing else. That
	 * distinction matters on this page: §7's card titles are `opacity: 0` with no
	 * `.active` counterpart because they are meant to appear on HOVER, and §6's
	 * inactive cards hide their own descriptions by design. Forcing opacity would
	 * have wrongly exposed both; clearing the transition leaves them correctly
	 * hidden, because the cascade still resolves them to zero.
	 *
	 * @param {Element} root Element whose subtree just had `.active` added.
	 * @return {void}
	 */
	function unfreeze( root ) {
		var kids = root.querySelectorAll( '*' );

		for ( var i = 0; i < kids.length; i++ ) {
			var kid = kids[ i ];

			if ( ! isSuppressed( kid ) ) {
				continue;
			}

			var t = window.getComputedStyle( kid ).transition;

			if ( t && 'all 0s ease 0s' !== t && 'none 0s ease 0s' !== t ) {
				kid.style.setProperty( 'transition', 'none', 'important' );
			}
		}
	}

	/**
	 * Has this element been on screen long enough to have had its chance?
	 *
	 * The grace period is what protects the animation, and it is measured from the
	 * moment the element FIRST became visible rather than from page load — an
	 * element ten screens down should not be judged on a clock that started before
	 * the reader ever reached it.
	 *
	 * @param {Element} el   Element to test.
	 * @param {number}  now  Current timestamp.
	 * @return {boolean} True when the element is due a check.
	 */
	function isDue( el, now ) {
		var r = el.getBoundingClientRect();
		var onScreen = r.top < window.innerHeight && r.bottom > 0 &&
			r.left < window.innerWidth && r.right > 0;

		if ( ! onScreen ) {
			// Reset, so it gets a fresh grace period next time it is scrolled to.
			seen.delete( el );
			return false;
		}

		if ( ! seen.has( el ) ) {
			seen.set( el, now );
			return false;
		}

		return now - seen.get( el ) >= GRACE_MS;
	}

	/** First-on-screen timestamps. A WeakMap so detached nodes are collectable. */
	var seen = new WeakMap();

	/**
	 * One pass over everything, repairing whatever is both due and wrong.
	 *
	 * @return {void}
	 */
	function tick() {
		var now = Date.now();
		var hosts = document.querySelectorAll( SELECTOR );
		var i;

		for ( i = 0; i < hosts.length; i++ ) {
			if ( isDue( hosts[ i ], now ) ) {
				repair( hosts[ i ] );
			}
		}

		/*
		 * The generated split pieces, matched STRUCTURALLY rather than by the name
		 * of whatever created them. Chasing trigger-class names is what let §13
		 * through once already; whatever the host is called, a split heading ends
		 * up with `.char` / `.word` / `.split-line` children and those carry the
		 * offset. They do not exist until SplitText runs, which is why they are
		 * found here on every pass rather than observed up front.
		 */
		var pieces = document.querySelectorAll( SPLIT_PIECES );

		for ( i = 0; i < pieces.length; i++ ) {
			var piece = pieces[ i ];

			if ( ! isDue( piece, now ) ) {
				continue;
			}

			if ( isSuppressed( piece ) || isOffset( window.getComputedStyle( piece ).transform ) ) {
				forceVisible( piece );
			}

			// And the host, which can be held at zero by a stylesheet while its
			// own children are perfectly visible — the §13 case exactly.
			var host = piece.closest( SELECTOR );

			if ( host && isSuppressed( host ) ) {
				forceVisible( host );
			}
		}
	}

	/**
	 * Force the end state everywhere, immediately and unconditionally.
	 *
	 * Only used for reduced motion, where there is no animation to protect and no
	 * reason to wait for anything.
	 *
	 * @return {void}
	 */
	function revealAll() {
		var hosts = document.querySelectorAll( SELECTOR );
		var i;

		for ( i = 0; i < hosts.length; i++ ) {
			repair( hosts[ i ] );
		}

		var pieces = document.querySelectorAll( SPLIT_PIECES );

		for ( i = 0; i < pieces.length; i++ ) {
			forceVisible( pieces[ i ] );
		}
	}

	function start() {
		if ( ! document.querySelector( SELECTOR ) ) {
			return;
		}

		if ( reduceMotion ) {
			revealAll();
			// Once more after load, for pieces SplitText had not created yet.
			window.addEventListener( 'load', function () {
				window.setTimeout( revealAll, 400 );
			} );
			return;
		}

		/*
		 * A POLLED PASS RATHER THAN A ONE-SHOT, for the reasons in repair(): the
		 * hiding can happen more than once and at times this file cannot predict.
		 * Each pass is a `querySelectorAll` over a few dozen nodes plus a rect
		 * test, so it is far too cheap to be worth optimising. It does not stop —
		 * see TICK_MS for why a wall-clock budget was wrong on a page this tall.
		 */
		window.setInterval( tick, TICK_MS );

		// Prompt passes at the two moments most likely to matter.
		window.addEventListener( 'load', function () {
			window.setTimeout( tick, GRACE_MS + 200 );
		} );

		window.addEventListener( 'resize', function () {
			seen = new WeakMap();
		} );
	}

	if ( 'loading' === document.readyState ) {
		document.addEventListener( 'DOMContentLoaded', start );
	} else {
		start();
	}
}() );
