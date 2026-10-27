(function () {
		var icons = document.querySelectorAll('img[data-pc-brand-spin]');
		if (!icons.length || !('IntersectionObserver' in window)) {
			return;
		}
		document.documentElement.classList.add('pc-js');
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				// Wait until the icon is really there (client: animate when we
				// reach it): 30% of it inside the upper 80% of the screen. Not
				// more, since on phones half of it sits off the screen edge. The
				// ratio check matters: the first report after observe() says
				// "intersecting" even for a sliver below the threshold.
				if (e.isIntersecting && e.intersectionRatio >= 0.3) {
					e.target.classList.add('pc-in');
					io.unobserve(e.target);
				}
			});
		}, { threshold: 0.3, rootMargin: '0px 0px -20% 0px' });
		icons.forEach(function (img) { io.observe(img); });
	})();

	/*
	 * The theme decides its scroll pins (hero, Capabilities stack, Why Us)
	 * once, at load: only on screens 992px+ / 1200px+. Load wide and then
	 * switch to a phone-sized view (DevTools device mode, a resized window,
	 * a rotated tablet) and the desktop pins stay: scrolling "sticks" and
	 * then jumps a whole section (client, 2026-10-15). Crossing one of those
	 * widths reloads the page so the right layout is built.
	 */
	['(min-width: 992px)', '(min-width: 1200px)'].forEach(function (q) {
		var mq = window.matchMedia && window.matchMedia(q);
		if (mq && mq.addEventListener) {
			mq.addEventListener('change', function () { window.location.reload(); });
		}
	});

	/*
	 * Case Studies client thumbnails: the theme's Swiper shows ONE per view
	 * below 576px, so a phone saw a single photo between the arrows. Three
	 * per view on phones; larger breakpoints keep the theme's values. The
	 * theme builds the slider on load, so this runs after it.
	 */
	window.addEventListener('load', function () {
		var el = document.querySelector('.nm_t2_preview_slider_active');
		var s = el && el.swiper;
		if (!s || !s.params.breakpoints) {
			return;
		}
		s.params.breakpoints['0'] = { slidesPerView: 3, spaceBetween: 10 };
		s.currentBreakpoint = false;
		s.setBreakpoint();
		s.update();
	});

	/*
	 * Capabilities deck on phones and tablets (client, 2026-10-15: "same
	 * animation mobile me bhi"). The theme pins the stack and flies the
	 * cards in one by one only from 992px up; below that this builds the
	 * same thing with the same GSAP calls. Pinned under the 70px header, so
	 * it needs a screen tall enough for a card (~650px) to fit; on shorter
	 * ones the cards stay a plain list.
	 */
	window.addEventListener('load', function () {
		if (!window.gsap || !window.ScrollTrigger || !window.matchMedia('(max-width: 991px)').matches) {
			return;
		}
		var area = document.querySelector('.nm-services-2-wrap-height');
		var cards = document.querySelectorAll('.s2_card_trigger_elm');
		if (!area || cards.length < 2) {
			return;
		}
		// Pinned 104px down (clear of the header); the tallest card plus its
		// tilt and deck offset must fit below that, or it stays a plain list.
		var tallest = 0;
		cards.forEach(function (c) { tallest = Math.max(tallest, c.offsetHeight); });
		if (104 + tallest + 30 > window.innerHeight) {
			return;
		}
		document.documentElement.classList.add('pc-svc-stack');
		area.style.height = (cards.length * 100) + 'vh';
		gsap.to('.nm-services-2-wrap-pin', {
			scrollTrigger: {
				trigger: area,
				start: 'top 104px',
				end: 'bottom bottom',
				pin: '.nm-services-2-wrap-pin',
				pinSpacing: true
			}
		});
		gsap.from(cards, {
			yPercent: 100,
			opacity: 0,
			stagger: 1,
			scrollTrigger: {
				trigger: '.s2_card_trigger',
				start: 'top 60%',
				end: 'bottom bottom',
				scrub: 1
			}
		});
		ScrollTrigger.refresh();
	});
