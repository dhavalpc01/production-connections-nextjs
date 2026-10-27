/* wp-port patched */
/*
	Author: themexriver
	Version: 1.0
*/

(function ($) {
	"use strict";

	// tochspin for product count
	if ($("input.product-count").length) {
		$("input.product-count").TouchSpin({
			min: 1,
			max: 1000,
			step: 1,
			buttondown_class: "btn btn-link",
			buttonup_class: "btn btn-link",
		});
	}

	/*
	lenis-smooth-scroll-activation
*/

	const lenis = new Lenis({
		duration: 1,
		easing: (t) => 1 - Math.pow(1 - t, 4),
		direction: "vertical",
		smooth: true,
		smoothTouch: false,
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	$('a[href^="#"]').on("click", function (e) {
		e.preventDefault();

		const target = $(this.getAttribute("href"));

		if (target.length) {
			lenis.scrollTo(target[0], {
				duration: 1.2,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			});
		}
	});

	gsap.config({
		nullTargetWarn: false,
	});

	/*
	sticky-header-function
*/

	function waStickyHeader() {
		var $window = $(window);
		var lastScrollTop = 0;
		var $header = $(".wa_sticky_header");
		var headerHeight = $header.outerHeight() + 30;

		$window.scroll(function () {
			var windowTop = $window.scrollTop();

			if (windowTop >= headerHeight) {
				$header.addClass("wa_sticky");
			} else {
				$header.removeClass("wa_sticky");
				$header.removeClass("wa_sticky_show");
			}

			if ($header.hasClass("wa_sticky")) {
				if (windowTop < lastScrollTop) {
					$header.addClass("wa_sticky_show");
				} else {
					$header.removeClass("wa_sticky_show");
				}
			}

			lastScrollTop = windowTop;
		});
	}

	waStickyHeader();

	/*
	offcanvas-function
*/

	$(".offcanvas_toggle").on("click", function () {
		$(".wa-overly, .offcanvas_box_active").addClass("active");
	});

	$(".wa-overly, .offcanvas_box_close").on("click", function () {
		$(".offcanvas_box_active").removeClass("active");
		$(".wa-overly").removeClass("active");
	});

	$(document).on("keydown", function (event) {
		if (event.key === "Escape") {
			$(".offcanvas_box_active").removeClass("active");
			$(".wa-overly").removeClass("active");
		}
	});

	$(".offcanvas_box_active a").on("click", function () {
		$(".offcanvas_box_active").removeClass("active");
		$(".wa-overly").removeClass("active");
	});

	/*
	mobile-dropdown-function
*/

	jQuery(".mobile-main-navigation li.dropdown").append(
		'<span class="dropdown-btn"><i class="fa-solid fa-angle-right"></i></span>'
	),
		jQuery(".mobile-main-navigation li .dropdown-btn").on(
			"click",
			function () {
				jQuery(this).hasClass("active")
					? (jQuery(this)
							.closest("ul")
							.find(".dropdown-btn.active")
							.toggleClass("active"),
					  jQuery(this)
							.closest("ul")
							.find(".dropdown-menu.active")
							.toggleClass("active")
							.slideToggle())
					: (jQuery(this)
							.closest("ul")
							.find(".dropdown-btn.active")
							.toggleClass("active"),
					  jQuery(this)
							.closest("ul")
							.find(".dropdown-menu.active")
							.toggleClass("active")
							.slideToggle(),
					  jQuery(this).toggleClass("active"),
					  jQuery(this)
							.parent()
							.find("> .dropdown-menu")
							.toggleClass("active"),
					  jQuery(this)
							.parent()
							.find("> .dropdown-menu")
							.slideToggle());
			}
		);

	/*
	search-popup-function
*/

	$(".search_btn_toggle").on("click", function () {
		$(".wa-overly, .search_box_active").addClass("active");
	});

	$(".wa-overly, .search_box_close").on("click", function () {
		$(".search_box_active").removeClass("active");
		$(".wa-overly").removeClass("active");
	});

	$(document).on("keydown", function (event) {
		if (event.key === "Escape") {
			$(".search_box_active").removeClass("active");
			$(".wa-overly").removeClass("active");
		}
	});

	/*
	windows-load-function
*/

	(function (fn) { setTimeout(fn, 0); })(function () {
		(function (fn) { setTimeout(fn, 0); })(function () {
			CustomEase.create("ease1", "0, 0, 0.2, 1");

			/*
			preloader-function
		*/
			let preloader = document.querySelector(".nm-preloader");
			if (preloader) {
				preloader.classList.add("preloaded");
				setTimeout(function () {
					preloader.remove();
				}, 1000);
			}

			/*
			wa-split-hero
		*/
			if ($(".wa_split_hero").length) {
				var waSplitHero = $(".wa_split_hero");
				if (waSplitHero.length == 0) return;

				gsap.registerPlugin(SplitText);

				waSplitHero.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words,chars",
						linesClass: "split-line",
					});

					gsap.set(el, { perspective: 400 });

					let delayValue = $(el).attr("data-split-delay") || "0s";
					delayValue = parseFloat(delayValue) || 0;

					if ($(el).hasClass("wa_split_hero")) {
						gsap.set(el.split.chars, {
							rotateY: 90,
							opacity: 0,
						});
					}

					el.anim = gsap.to(el.split.chars, {
						rotateY: 0,
						opacity: 1,
						duration: 2,
						ease: "elastic.out(1,0)",
						stagger: 0.07,
						delay: delayValue,
					});
				});
			}

			/*
			section-title-1
		*/
			const wa_bg_position = new SplitText(".wa_bg_position", {
				type: "lines",
			});
			wa_bg_position.lines.forEach((target) => {
				gsap.to(target, {
					backgroundPositionX: 0,
					ease: "none",
					scrollTrigger: {
						trigger: target,
						scrub: 1,
						start: "top 85%",
						end: "bottom center",
					},
				});
			});

			/*
			wa-split-right
		*/
			if ($(".wa_split_right").length) {
				var waSplitRight = $(".wa_split_right");
				if (waSplitRight.length == 0) return;

				gsap.registerPlugin(SplitText);

				waSplitRight.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words,chars",
						linesClass: "split-line",
					});

					gsap.set(el, { perspective: 400 });

					let delayValue = $(el).attr("data-split-delay") || "0s";
					delayValue = parseFloat(delayValue) || 0;

					if ($(el).hasClass("wa_split_right")) {
						gsap.set(el.split.chars, {
							x: 50,
							opacity: 0,
						});
					}

					el.anim = gsap.to(el.split.chars, {
						scrollTrigger: {
							trigger: el,
							start: "top 90%",
							toggleActions: "play none none reverse",
						},
						x: 0,
						color: "inherit",
						opacity: 1,
						duration: 0.4,
						ease: "ease1",
						stagger: 0.02,
						delay: delayValue,
					});
				});
			}

			/*
			wa-split-y
		*/
			if ($(".wa_split_bottom").length) {
				var split9 = $(".wa_split_bottom");
				if (split9.length == 0) return;
				gsap.registerPlugin(SplitText);
				split9.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words,chars",
						linesClass: "split-line",
					});

					if ($(el).hasClass("wa_split_bottom")) {
						gsap.set(el.split.chars, {
							yPercent: 150,
						});
					}

					el.anim = gsap.to(el.split.chars, {
						scrollTrigger: {
							trigger: el,
							start: "top 90%",
						},
						yPercent: 0,
						opacity: 1,
						duration: 0.3,
						ease: "ease1",
						stagger: 0.03,
					});
				});
			}

			/*
			wa-clip-left-right
		*/
			gsap.utils.toArray(".wa_clip_left_right").forEach((element) => {
				let delayValue = $(element).attr("data-split-duration") || "1s";
				delayValue = parseFloat(delayValue) || 0;

				gsap.fromTo(
					element,
					{ clipPath: "polygon(0% 0%, 0% 0%, 0 100%, 0% 100%)" },
					{
						clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
						ease: "ease1",
						duration: delayValue,
						scrollTrigger: {
							trigger: element,
							start: "top 90%",
							toggleActions: "play none none reverse",
							markers: false,
						},
					}
				);
			});

			/*
			wa_clip_right_left
		*/
			gsap.utils.toArray(".wa_clip_right_left").forEach((element) => {
				let delayValue =
					$(element).attr("data-split-duration") || ".8s";
				delayValue = parseFloat(delayValue) || 0;

				gsap.fromTo(
					element,
					{
						clipPath:
							"polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
					},
					{
						clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
						ease: "ease1",
						duration: delayValue,
						scrollTrigger: {
							trigger: element,
							start: "top 90%",
							toggleActions: "play none none reverse",
							markers: false,
						},
					}
				);
			});

			/*
			add-active-class
		*/
			const waAddClass = gsap.utils.toArray(".wa_add_class");
			waAddClass.forEach((waAddClassItem) => {
				gsap.to(waAddClassItem, {
					scrollTrigger: {
						trigger: waAddClassItem,
						start: "top 90%",
						end: "bottom bottom",
						toggleActions: "play none none reverse",
						toggleClass: "active",
						once: true,
						markers: false,
					},
				});
			});

			/*
			remove-class
		*/
			gsap.utils.toArray(".wa_remove_class").forEach((item) => {
				item.classList.add("active");

				ScrollTrigger.create({
					trigger: item,
					start: "top 90%",
					end: "bottom bottom",
					markers: false,
					onEnter: () => {
						item.classList.remove("active");
					},
				});
			});

			/*
			wow-activation
		*/
			if ($(".wow").length) {
				var wow = new WOW({
					boxClass: "wow",
					animateClass: "animated",
					offset: 50,
					mobile: true,
					live: true,
				});
				wow.init();
			}
		});
	});

	/*
	subtitle-1-plus
*/
	gsap.utils.toArray(".nm-about-1-line-plus .plus").forEach((element) => {
		gsap.fromTo(
			element,
			{ rotation: 360 },
			{
				rotation: 0,
				ease: "none",
				scrollTrigger: {
					trigger: element,
					scrub: 3,
					markers: false,
				},
			}
		);
	});

	/*
	subtitle-1-line
*/
	gsap.utils.toArray(".nm-about-1-line-border").forEach((element) => {
		gsap.from(element, {
			scaleX: 0,
			ease: "none",
			scrollTrigger: {
				trigger: element,
				end: "top 60%",
				scrub: true,
				markers: false,
			},
		});
	});

	/*
	subtitle-2-ani
*/
	gsap.utils.toArray(".nm-subtitle-2").forEach((card) => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: card,
				start: "top 90%",
				end: "top 20%",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		tl.from(card.querySelector(".nm-subtitle-2 .icon"), {
			rotation: 360,
		}).from(
			card.querySelector(".nm-subtitle-2 .line"),
			{
				scaleX: 0,
			},
			"<="
		);
	});

	/*
	wa-parallax-shape-2
*/
	gsap.utils.toArray(".wa_parallax_shape_2").forEach((item) => {
		gsap.from(item, {
			y: 100,
			opacity: 0,
			scrollTrigger: {
				trigger: item,
				start: "to 80%",
				end: "to 10%",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});
	});

	/*
	wa-parallax-shape-3
*/
	gsap.utils.toArray(".wa_parallax_shape_3").forEach((item) => {
		gsap.from(item, {
			yPercent: 70,
			ease: "elastic.out(1,0.4)",
			duration: 2.5,
			scrollTrigger: {
				trigger: item,
				start: "to 100%",
				end: "to 10%",
				toggleActions: "play none none reverse",
				// scrub: true,
				markers: false,
			},
		});
	});

	/*
	menu-link-animation
*/
	if ($(".btn-split-right").length) {
		var splitButton1 = $(".btn-split-right a");
		gsap.registerPlugin(SplitText);

		splitButton1.each(function (index, el) {
			el.split = new SplitText(el, {
				type: "words,chars",
			});

			$(el).on("mouseenter", function () {
				el.split.chars.forEach((char, i) => {
					let yValue = i % 2 === 0 ? -180 : 180;

					gsap.fromTo(
						char,
						{ rotateY: yValue },
						{
							rotateY: 0,
							opacity: 1,
							duration: 0.6,
							ease: "case1",
						}
					);
				});
			});
		});
	}

	/*
	firefly-animation
*/
	const paths = document.querySelectorAll(".nm-Firefly-ani-svg path");

	paths.forEach((path) => {
		function animatePath() {
			gsap.to(path, {
				opacity: Math.random() > 0.5 ? 1 : 0,
				duration: Math.random() * 0.6 + 0.2,
				delay: Math.random() * 0.2,
				onComplete: animatePath,
				ease: "power1.inOut",
			});
		}
		animatePath();
	});

	/*
	services-1-scrollbar
*/

	if ($(".with-plugin").length) {
		$(".with-plugin").mCustomScrollbar({
			theme: "dark-3",
			scrollButtons: { enable: false },
			// autoHideScrollbar: "true",
			// alwaysShowScrollbar : 0
		});
	}

	/*
	choose-1-handshake-video
*/
	if ($(".handshake-video").length) {
		const video = document.querySelector(".handshake-video video");

		video.addEventListener("timeupdate", () => {
			if (video.currentTime >= 1) {
				video.pause();
			}
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						video.play();
					} else {
						video.pause();
					}
				});
			},
			{
				threshold: 0,
			}
		);

		observer.observe(video);
	}

	/*
	portfolio-1-animation
*/
	if (window.matchMedia("(min-width: 992px)").matches) {
		var portfolio1animation = gsap.timeline({
			scrollTrigger: {
				trigger: ".p1_ani_trigger",
				start: "top 20%",
				end: "top -20%",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		portfolio1animation.from(".p1_ani_trigger_elm_1", {
			x: 710,
			y: -790,
			scale: 0.7,
			rotate: 4,
		});
		portfolio1animation.from(
			".p1_ani_trigger_elm_2",
			{
				x: -50,
				y: -790,
				scale: 0.7,
				rotate: -4,
			},
			"<="
		);
		portfolio1animation.from(
			".p1_ani_trigger_elm_3",
			{
				x: 730,
				y: -1250,
				scale: 0.7,
				rotate: -7,
			},
			"<="
		);
		portfolio1animation.from(
			".p1_ani_trigger_elm_4",
			{
				x: -30,
				y: -1250,
				scale: 0.7,
				rotate: 5,
			},
			"<="
		);
	}

	/*
	steps-1-animation
*/

	gsap.utils.toArray(".nm_steps1_ani_trigger").forEach((card) => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: card,
				start: "top 80%",
				end: () => "+=" + card.offsetHeight,
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		tl.to(card.querySelector(".number"), {
			backgroundColor: "var(--nm-clr-pr-1)",
			color: "#000",
			duration: 0.3,
		})
			.to(card.querySelector(".number-line-fill"), {
				scaleY: 1,
				duration: 1,
			})
			.to(
				card.querySelector(".nm-steps-1-card .content"),
				{
					rotateY: 0,
					duration: 1,
				},
				"<="
			);
	});

	/*
	team-1-active-class
*/
	ScrollTrigger.create({
		trigger: ".nm-team-1-slider",
		start: "top 80%",
		onEnter: () => {
			const teamSlider = document.querySelector(".nm-team-1-slider");

			if (!teamSlider) return;

			teamSlider.classList.add("active");

			setTimeout(() => {
				teamSlider.classList.remove("active");
			}, 2000);
		},
		once: true,
	});

	if ($(".nm-team-1-member").length) {
		$(document).on("click", ".nm-team-1-member .toggle-btn", function () {
			const parent = $(this).closest(".nm-team-1-member");

			if (parent.hasClass("active")) {
				parent.removeClass("active");
			} else {
				$(".nm-team-1-member").removeClass("active");
				parent.addClass("active");
			}
		});
	}

	/*
	faqs-1-contact-form-sticky


*/

	if ($(".nm-faqs-1-contact-pin").length) {
		if (window.matchMedia("(min-width: 1200px)").matches) {
			gsap.to(".nm-faqs-1-contact-pin", {
				scrollTrigger: {
					trigger: ".nm-faqs-1-wrap",
					start: "top 10%",
					end: () => {
						const rightHeight =
							document.querySelector(
								".nm-faqs-1-right"
							).offsetHeight;
						const leftHeight =
							document.querySelector(
								".nm-faqs-1-contact"
							).offsetHeight;
						return "+=" + (rightHeight - leftHeight);
					},
					pin: ".nm-faqs-1-contact-pin",
					pinSpacing: false,
					markers: false,
				},
			});
		}
	}

	/*
	blog-1-hover-active-class
*/
	$(document).on("mouseenter", ".nm-blog-1-item", function () {
		$(".nm-blog-1-item").removeClass("active");

		$(this).addClass("active");
	});

	/*
	Services-2-card-sticky
*/
	if (window.matchMedia("(min-width: 992px)").matches) {
		const cards = document.querySelectorAll(".s2_card_trigger_elm");
		const cardCount = cards.length;
		const cardArea = document.querySelector(".nm-services-2-wrap-height");
		if (window.matchMedia("(max-width: 1500px)").matches) {
			if (cardArea) {
				// Set dynamic height based on number of cards
				cardArea.style.height = `${cardCount * 100}vh`;
			}
		} else {
			if (cardArea) {
				// Set dynamic height based on number of cards
				cardArea.style.height = `${cardCount * 70}vh`;
			}
		}

		// Pin section
		gsap.to(".nm-services-2-wrap-pin", {
			scrollTrigger: {
				trigger: ".nm-services-2-wrap-height",
				start: "top 20%",
				end: "bottom bottom",
				pin: ".nm-services-2-wrap-pin",
				pinSpacing: true,
				markers: false,
			},
		});

		// Animate cards one by one
		gsap.from(cards, {
			yPercent: 100,
			opacity: 0,
			stagger: 1, // spacing between cards entering
			scrollTrigger: {
				trigger: ".s2_card_trigger",
				start: "top 60%",
				end: "bottom bottom",
				scrub: 1,
				toggleActions: "play reverse play reverse",
				markers: false,
			},
		});
	}

	/*
	portfolio-2-sticky-card
*/
	if (window.matchMedia("(min-width: 992px)").matches) {
		if ($(".p2_sticky_trigger").length) {
			const waCardsWrappers = gsap.utils.toArray(
				".p2_sticky_trigger_pin"
			);
			const waCards = gsap.utils.toArray(".p2_sticky_trigger_elm");

			waCardsWrappers.forEach((waWrapper, waIndex) => {
				const waCard = waCards[waIndex];
				let waScale = 1,
					waRotation = 0;

				if (waIndex !== waCards.length - 1) {
					waScale = 0.7 + 0.01 * waIndex;
					waRotation = -10;

					const nextWrapper = waCardsWrappers[waIndex + 1];

					gsap.to(waCard, {
						scale: waScale,
						rotationX: waRotation,
						opacity: 0,
						filter: "blur(11px)",
						ease: "none",
						scrollTrigger: {
							trigger: nextWrapper,
							start: "top center",
							end: "top top",
							scrub: true,
							markers: false,
						},
					});
				}

				// Base pin animation
				gsap.to(waCard, {
					transformOrigin: "top center",
					ease: "none",
					scrollTrigger: {
						trigger: waWrapper,
						start: "top " + (200 + 0 * waIndex),
						end: "bottom 78.5%",
						// anticipatePin: 1,
						// pinType: "transform",
						endTrigger: ".p2_sticky_trigger",
						scrub: true,
						pin: waWrapper,
						pinSpacing: false,
						markers: false,
					},
				});
			});
		}

		gsap.to(".nm-portfolio-2-content", {
			scrollTrigger: {
				trigger: ".nm-portfolio-2-area",
				start: "top 10%",
				end: "bottom 95%",
				pin: ".nm-portfolio-2-content",
				pinSpacing: false,
				//   anticipatePin: .1,
				//   pinType: "transform",
				markers: false,
			},
		});
	}

	/*
	choose-2-pin
*/

	if (window.matchMedia("(min-width: 1200px)").matches) {
		gsap.to(".nm-choose-2-area", {
			scrollTrigger: {
				trigger: ".nm-portfolio-2-area",
				start: "top 80%",
				end: "bottom bottom",
				pin: ".nm-choose-2-area",
				pinSpacing: false,
				markers: false,
			},
		});
	}

	/*
	pricing-2-pin
*/
	if (window.matchMedia("(min-width: 1200px)").matches) {
		gsap.to(".nm-price-2-area", {
			scrollTrigger: {
				trigger: ".nm-trial-2-area",
				start: "top 80%",
				end: "bottom 60%",
				pin: ".nm-price-2-area",
				pinSpacing: false,
				markers: false,
			},
		});
	}
	/*
	hero-2-pin
*/
	if (window.matchMedia("(min-width: 1200px)").matches) {
		gsap.to(".header-x-hero", {
			scrollTrigger: {
				trigger: ".header-x-hero",
				start: "top top",
				pin: ".header-x-hero",
				pinSpacing: false,
				markers: false,
			},
		});
	}

	/*
	hero-3-pin
*/
	if (window.matchMedia("(min-width: 1200px)").matches) {
		gsap.to(".nm-hero-3-area", {
			scrollTrigger: {
				trigger: ".nm-hero-3-area",
				start: "top top",
				pin: ".nm-hero-3-area",
				pinSpacing: false,
				markers: false,
			},
		});
	}

	/*
	button-animation
*/
	if ($(".btn_split_left").length) {
		var splitButton1 = $(".btn_split_left");
		gsap.registerPlugin(SplitText);

		splitButton1.each(function (index, el) {
			el.split = new SplitText(el, {
				type: "words,chars",
			});

			$(el).on("mouseenter", function () {
				gsap.fromTo(
					el.split.chars,
					{ x: -20, opacity: 0 },
					{
						x: 0,
						opacity: 1,
						duration: 0.3,
						stagger: -0.03,
						ease: "ease1",
					}
				);
			});
		});
	}

	// wa-parallax-img
	gsap.utils.toArray(".wa-parallax-img").forEach((element) => {
		gsap.fromTo(
			element,
			{ objectPosition: "50% 0%" },
			{
				objectPosition: "50% 100%",
				ease: "none",
				scrollTrigger: {
					trigger: element,
					scrub: 5,
					delay: 1,
					markers: false,
				},
			}
		);
	});

	// wa-bg-parallax
	gsap.utils.toArray(".wa-parallax-bg").forEach((element) => {
		gsap.fromTo(
			element,
			{ backgroundPosition: "50% 0%" },
			{
				backgroundPosition: "50% 100%",
				ease: "none",
				scrollTrigger: {
					trigger: element,
					scrub: 3,
					delay: 1,
					markers: false,
				},
			}
		);
	});

	// wa_rotated
	gsap.utils.toArray(".wa_rotated").forEach((element) => {
		gsap.fromTo(
			element,
			{ rotation: 0 },
			{
				rotation: 360,
				ease: "none",
				scrollTrigger: {
					trigger: element,
					scrub: 5,
					delay: 1,
					markers: false,
				},
			}
		);
	});

	/*
	wa-parallax-item
*/
	gsap.utils.toArray(".wa-parallax-item").forEach((item) => {
		gsap.from(item, {
			yPercent: 30,
			scrollTrigger: {
				trigger: item,
				end: "to 10%",
				toggleActions: "play none none reverse",
				scrub: 5,
				delay: 1,
				markers: false,
			},
		});
	});

	/*
	price-3-toggle-class
*/
	if ($(".nm-price-2-toggle-btn").length) {
		$(".nm-price-2-toggle-btn").on("click", function () {
			$(".nm-price-2-toggle-btn").toggleClass("is-active");
			$(".price-wrap").toggleClass("is-active");
		});
	}

	$(".wa_marquee_left").marquee({
		speed: 15,
		gap: 0,
		delayBeforeStart: 0,
		startVisible: true,
		direction: "left",
		duplicated: true,
		pauseOnHover: true,
	});

	$(".wa_marquee_right").marquee({
		speed: 15,
		gap: 0,
		delayBeforeStart: 0,
		startVisible: true,
		direction: "right",
		duplicated: true,
		pauseOnHover: true,
	});

	// placeholder-typing
	document
		.querySelectorAll(".wa_placeholder")
		.forEach((waPlaceholderInput) => {
			const waPlaceholderText = waPlaceholderInput.placeholder;
			const waStartDelay = waPlaceholderInput.dataset.startDelay
				? parseInt(waPlaceholderInput.dataset.startDelay)
				: 0;
			let waPlaceholderIndex = 0;
			waPlaceholderInput.placeholder = "";

			const waPlaceholderObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							waPlaceholderType();
							waPlaceholderObserver.unobserve(waPlaceholderInput);
						}
					});
				},
				{ threshold: 0.5 }
			);

			setTimeout(() => {
				waPlaceholderObserver.observe(waPlaceholderInput);
			}, waStartDelay);

			function waPlaceholderType() {
				if (waPlaceholderIndex < waPlaceholderText.length) {
					waPlaceholderInput.placeholder +=
						waPlaceholderText.charAt(waPlaceholderIndex);
					waPlaceholderIndex++;
					setTimeout(waPlaceholderType, 70);
				}
			}
		});

	if ($(".wa_height_set").length) {
		const wa_height_set = document.querySelector(".wa_height_set");
		const wa_height_get = document.querySelector(".wa_height_get");
		function setDynamicHeight() {
			if (wa_height_get && wa_height_set) {
				wa_height_set.style.height = wa_height_get.offsetHeight + "px";
			}
		}
		setDynamicHeight();
		window.addEventListener("resize", setDynamicHeight);
	}

	/*
	magnetic-item-animation
*/
	if ($(".wa_magnetic").length) {
		var waMagnets = document.querySelectorAll(".wa-magnetic");
		var waStrength = 100;

		waMagnets.forEach((magnet) => {
			magnet.addEventListener("mousemove", moveMagnet);
			magnet.addEventListener("mouseout", function (event) {
				gsap.to(event.currentTarget, {
					x: 0,
					y: 0,
					duration: 1,
					ease: "elastic.out(1,0.3)",
				});
			});
		});

		function moveMagnet(event) {
			var magnetButton = event.currentTarget;
			var bounding = magnetButton.getBoundingClientRect();

			gsap.to(magnetButton, {
				x:
					((event.clientX - bounding.left) /
						magnetButton.offsetWidth -
						0.5) *
					waStrength,
				y:
					((event.clientY - bounding.top) /
						magnetButton.offsetHeight -
						0.5) *
					waStrength,
				duration: 1,
				ease: "elastic.out(1,0.3)",
			});
		}
	}

	/*
	magnetic-button-animation
*/
	/*
	magnetic-1 (on full button)
*/
	if ($(".wa_magnetic_btn").length) {
		var waMagnets1 = document.querySelectorAll(".wa_magnetic_btn");
		var waStrength1 = 30;

		waMagnets1.forEach((magnet) => {
			magnet.addEventListener("mousemove", moveMagnet1);
			magnet.addEventListener("mouseout", function (event) {
				gsap.to(event.currentTarget, {
					x: 0,
					y: 0,
					duration: 1,
					ease: "elastic.out(1,0.3)",
				});
			});
		});

		function moveMagnet1(event) {
			var magnetButton = event.currentTarget;
			var bounding = magnetButton.getBoundingClientRect();

			gsap.to(magnetButton, {
				x:
					((event.clientX - bounding.left) /
						magnetButton.offsetWidth -
						0.5) *
					waStrength1,
				y:
					((event.clientY - bounding.top) /
						magnetButton.offsetHeight -
						0.5) *
					waStrength1,
				duration: 1,
				ease: "elastic.out(1,0.3)",
			});
		}
	}

	/*
	magnetic-2
*/
	if ($(".wa_magnetic_btn_2").length) {
		var waMagnets2 = document.querySelectorAll(".wa_magnetic_btn_2");
		var waStrength2 = 30;

		waMagnets2.forEach((magnet) => {
			magnet.addEventListener("mousemove", moveMagnet2);
			magnet.addEventListener("mouseout", function (event) {
				const innerElements = event.currentTarget.querySelectorAll(
					".wa_magnetic_btn_2_elm"
				);
				innerElements.forEach((elm) => {
					gsap.to(elm, {
						x: 0,
						y: 0,
						duration: 1,
						ease: "elastic.out(1, 0.3)",
					});
				});
			});
		});

		function moveMagnet2(event) {
			var magnetButton = event.currentTarget;
			var bounding = magnetButton.getBoundingClientRect();
			const innerElements = magnetButton.querySelectorAll(
				".wa_magnetic_btn_2_elm"
			);

			const xMove =
				((event.clientX - bounding.left) / magnetButton.offsetWidth -
					0.5) *
				waStrength2;
			const yMove =
				((event.clientY - bounding.top) / magnetButton.offsetHeight -
					0.5) *
				waStrength2;

			innerElements.forEach((elm) => {
				gsap.to(elm, {
					x: xMove,
					y: yMove,
					duration: 1,
					ease: "elastic.out(1, 0.3)",
				});
			});
		}
	}

	/*
	magnetic-3 (on inner elements only)
*/
	if (window.matchMedia("(min-width: 992px)").matches) {
	}
	if ($(".wa_magnetic_btn_3").length) {
		var waMagnets3 = document.querySelectorAll(".wa_magnetic_btn_3");
		var waStrength3 = 100;

		waMagnets3.forEach((magnet) => {
			magnet.addEventListener("mousemove", moveMagnet3);
			magnet.addEventListener("mouseout", function (event) {
				const innerElements = event.currentTarget.querySelectorAll(
					".wa_magnetic_btn_3_elm"
				);
				innerElements.forEach((elm) => {
					gsap.to(elm, {
						x: 0,
						y: 0,
						duration: 1,
						ease: "elastic.out(1, 0.3)",
					});
				});
			});
		});

		function moveMagnet3(event) {
			var magnetButton = event.currentTarget;
			var bounding = magnetButton.getBoundingClientRect();
			const innerElements = magnetButton.querySelectorAll(
				".wa_magnetic_btn_3_elm"
			);

			const xMove =
				((event.clientX - bounding.left) / magnetButton.offsetWidth -
					0.5) *
				waStrength3;
			const yMove =
				((event.clientY - bounding.top) / magnetButton.offsetHeight -
					0.5) *
				waStrength3;

			innerElements.forEach((elm) => {
				gsap.to(elm, {
					x: xMove,
					y: yMove,
					duration: 1,
					ease: "elastic.out(1, 0.3)",
				});
			});
		}
	}

	/*
	mouse-move-animation-function
*/
	document.addEventListener("mousemove", parallax);
	function parallax(e) {
		document.querySelectorAll(".wa_moving_elm").forEach(function (move) {
			var moving_value = move.getAttribute("data-value");
			var x = (e.clientX * moving_value) / 250;
			var y = (e.clientY * moving_value) / 250;

			move.style.transform =
				"translateX(" + x + "px) translateY(" + y + "px)";
		});
	}

	/*
	counter-activation
*/
	$(".counter").counterUp({
		delay: 10,
		time: 5000,
	});

	if ($(".wa-counter").length) {
		let elements = document.querySelectorAll(".wa-counter");

		elements.forEach((element) => {
			let innerWidth = element.clientWidth;
			element.style.width = innerWidth + "px";
		});
	}

	/*
	hero-2-animation
*/
	const $section = $(".header-x-hero");
	const $target = $(".tilt_scale");

	$section.on("mousemove", function (e) {
		const offset = $section.offset();
		const width = $section.outerWidth();
		const height = $section.outerHeight();

		const x = e.pageX - offset.left;
		const y = e.pageY - offset.top;

		const rotateY = (x / width - 0.5) * 20;
		const rotateX = (y / height - 0.5) * -20;

		$target.css({
			transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) `,
		});
	});

	$section.on("mouseleave", function () {
		$target.css({
			transform:
				"perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
		});
	});

	/*
	marquee-down-top
*/

	if ($(".wa_marquee_down_top").length) {
		const waMarqueeTop = document.querySelector(".wa_marquee_down_top");
		const waMarqueeClone = waMarqueeTop.cloneNode(true);
		waMarqueeTop.parentNode.appendChild(waMarqueeClone);

		const waMarqueeTotalHeight = waMarqueeTop.offsetHeight;

		gsap.to(".wa_marquee_down_top", {
			y: `-${waMarqueeTotalHeight}px`,
			ease: "none",
			duration: 20,
			repeat: -1,
			modifiers: {
				y: gsap.utils.unitize(
					(waY) => parseFloat(waY) % waMarqueeTotalHeight
				),
			},
		});
	}

	/*
	marquee-top-down
*/
	if ($(".wa_marquee_top_down").length) {
		const waMarqueeTopDown = document.querySelector(".wa_marquee_top_down");
		const waMarqueeTopDownClone = waMarqueeTopDown.cloneNode(true);
		waMarqueeTopDown.parentNode.appendChild(waMarqueeTopDownClone);

		const waMarqueeTopDownHeight = waMarqueeTopDown.offsetHeight;

		gsap.to(".wa_marquee_top_down", {
			y: `${waMarqueeTopDownHeight}px`,
			ease: "none",
			duration: 20,
			repeat: -1,
			modifiers: {
				y: gsap.utils.unitize(
					(waY) => parseFloat(waY) % waMarqueeTopDownHeight
				),
			},
		});
	}

	/*
	bootstrap-tooltip-activation
*/
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

	/*
	back-to-top-button-function
*/
	if ($(".wa_backToTop").length) {
		var scrollTopbtn = document.querySelector(".wa_backToTop");
		var offset = 500;
		var duration = 1000;

		$(window).on("scroll", function () {
			if ($(this).scrollTop() > offset) {
				$(scrollTopbtn).addClass("active");
			} else {
				$(scrollTopbtn).removeClass("active");
			}
		});

		$(scrollTopbtn).on("click", function (event) {
			event.preventDefault();
			$("html, body").animate({ scrollTop: 0 }, duration, "swing");
		});
	}

	/*
	popup-video-activation
*/
	if ($(".popup_video").length) {
		$(".popup_video").magnificPopup({
			type: "iframe",
		});
	}

	/*
	popup-image-activation
*/
	if ($(".popup_img").length) {
		$(".popup_img").magnificPopup({
			type: "image",
			gallery: {
				enabled: true,
			},
		});
	}

	/*
	faqs-8-active-class
*/
	$(document).on("click", ".wa_accordion_item", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});

	/*
	nice-selector-activation
*/
	if ($(".nice-select").length) {
		$(".nice-select select").niceSelect();
	}

	/*
	background-image-function
*/
	$("[data-background]").each(function () {
		$(this).css(
			"background-image",
			"url(" + $(this).attr("data-background") + ") "
		);
	});

	/*
	current-year-function
*/
	if ($(".copyright-year").length) {
		const currentYear = new Date().getFullYear();
		$(".copyright-year").text(currentYear);
	}

	/*
	cursor-animation
*/
	class Cursor {
		constructor(options) {
			this.options = $.extend(
				true,
				{
					container: "body",
					speed: 0.5,
					ease: "expo.out",
					visibleTimeout: 300,
				},
				options
			);
			this.pos = { x: 0, y: 0 };
			this.body = $(this.options.container);
			this.el = $('<div class="wa-cursor"></div>');
			this.text = $('<div class="wa-cursor-text"></div>');
			this.init();
		}

		init() {
			this.el.append(this.text);
			this.body.append(this.el);
			this.bind();
			this.move(-window.innerWidth, -window.innerHeight, 0);
		}

		bind() {
			const self = this;

			this.body
				.on("mouseleave", () => {
					self.hide();
				})
				.on("mouseenter", () => {
					self.show();
				})
				.on("mousemove", (e) => {
					this.pos = {
						x: this.stick
							? this.stick.x - (this.stick.x - e.clientX) * 0.15
							: e.clientX,
						y: this.stick
							? this.stick.y - (this.stick.y - e.clientY) * 0.15
							: e.clientY,
					};
					this.update();
				})
				.on("mousedown", () => {
					self.setState("-active");
				})
				.on("mouseup", () => {
					self.removeState("-active");
				})
				.on("mouseenter", "a,input,textarea,button", () => {
					self.setState("-pointer");
				})
				.on("mouseleave", "a,input,textarea,button", () => {
					self.removeState("-pointer");
				})
				.on("mouseenter", "iframe", () => {
					self.hide();
				})
				.on("mouseleave", "iframe", () => {
					self.show();
				})
				.on("mouseenter", "[data-cursor]", function () {
					self.setState(this.dataset.cursor);
				})
				.on("mouseleave", "[data-cursor]", function () {
					self.removeState(this.dataset.cursor);
				})
				.on("mouseenter", "[data-cursor-text]", function () {
					self.setText(this.dataset.cursorText);
				})
				.on("mouseleave", "[data-cursor-text]", function () {
					self.removeText();
				})
				.on("mouseenter", "[data-cursor-stick]", function () {
					self.setStick(this.dataset.cursorStick);
				})
				.on("mouseleave", "[data-cursor-stick]", function () {
					self.removeStick();
				});
		}

		setState(state) {
			this.el.addClass(state);
		}

		removeState(state) {
			this.el.removeClass(state);
		}

		toggleState(state) {
			this.el.toggleClass(state);
		}

		setText(text) {
			this.text.html(text);
			this.el.addClass("-text");
		}

		removeText() {
			this.el.removeClass("-text");
		}

		setStick(el) {
			const target = $(el);
			const bound = target.get(0).getBoundingClientRect();
			this.stick = {
				y: bound.top + target.height() / 2,
				x: bound.left + target.width() / 2,
			};
			this.move(this.stick.x, this.stick.y, 5);
		}

		removeStick() {
			this.stick = false;
		}

		update() {
			this.move();
			this.show();
		}

		move(x, y, duration) {
			gsap.to(this.el, {
				x: x || this.pos.x,
				y: y || this.pos.y,
				force3D: true,
				overwrite: true,
				ease: this.options.ease,
				duration: this.visible ? duration || this.options.speed : 0,
			});
		}

		show() {
			if (this.visible) return;
			clearInterval(this.visibleInt);
			this.el.addClass("-visible");
			this.visibleInt = setTimeout(() => (this.visible = true));
		}

		hide() {
			clearInterval(this.visibleInt);
			this.el.removeClass("-visible");
			this.visibleInt = setTimeout(
				() => (this.visible = false),
				this.options.visibleTimeout
			);
		}
	}
	const cursor = new Cursor();
	$(".nm-services-1-tabs-btn .nav-link").on("shown.bs.tab", function (e) {
		// Only run on mobile (adjust breakpoint if needed)
		if ($(window).width() <= 767) {
			var targetId = $(this).data("bs-target");
			var $contentWrap = $(targetId).find(".content-wrap");

			if ($contentWrap.length) {
				var offset = $contentWrap.offset().top - 20; // adjust -20 if header overlaps
				$("html, body").animate(
					{ scrollTop: offset },
					500 // scroll speed in ms
				);
			}
		}
	});

	/*
	services-4-hover-active
*/
	$(".nm-services-4-item").on("mouseover", function () {
		var current_class = document.getElementsByClassName(
			"nm-services-4-item active"
		);
		current_class[0].className = current_class[0].className.replace(
			" active",
			""
		);
		this.className += " active";
	});

	/*
	team-4-hover-active
*/
	$(".nm-team-4-member").on("mouseover", function () {
		var current_class = document.getElementsByClassName(
			"nm-team-4-member active"
		);
		current_class[0].className = current_class[0].className.replace(
			" active",
			""
		);
		this.className += " active";
	});

	/*
	price-4-toggle-class
*/
	if ($(".nm-price-4-toggle-btn").length) {
		$(".nm-price-4-toggle-btn").on("click", function () {
			$(".nm-price-4-toggle-btn").toggleClass("is-active");
			$(".price-wrap").toggleClass("is-active");
		});
	}

	/*
	hover-elm-moving
*/
	if ($(".wa_magnetic_btn_v2-1").length) {
		var waMagnets2v2 = document.querySelectorAll(".wa_magnetic_btn_v2-1");
		var waStrength2v2 = 30;

		waMagnets2v2.forEach((magnet) => {
			magnet.addEventListener("mousemove", moveMagnet2);
			magnet.addEventListener("mouseout", function (event) {
				const innerElements = event.currentTarget.querySelectorAll(
					".wa_magnetic_btn_v2-1_elm"
				);
				innerElements.forEach((elm) => {
					gsap.to(elm, {
						x: 0,
						y: 0,
						duration: 1,
						ease: "ease1",
					});
				});
			});
		});

		function moveMagnet2(event) {
			var magnetButton = event.currentTarget;
			var bounding = magnetButton.getBoundingClientRect();
			const innerElements = magnetButton.querySelectorAll(
				".wa_magnetic_btn_v2-1_elm"
			);

			const xMove =
				((event.clientX - bounding.left) / magnetButton.offsetWidth -
					0.5) *
				waStrength2v2;
			const yMove =
				((event.clientY - bounding.top) / magnetButton.offsetHeight -
					0.5) *
				waStrength2v2;

			innerElements.forEach((elm) => {
				gsap.to(elm, {
					x: xMove,
					y: yMove,
					duration: 1,
					ease: "ease1",
				});
			});
		}
	}

	(function (fn) { setTimeout(fn, 0); })(function () {
		// section-title-8
		if ($(".nm-split2-1").length) {
			var split8 = $(".nm-split2-1");
			if (split8.length == 0) return;
			gsap.registerPlugin(SplitText);
			split8.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});

				// gsap.set(el, { perspective: 400 });

				if ($(el).hasClass("nm-split2-1")) {
					gsap.set(el.split.chars, {
						yPercent: 120,
					});
				}

				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 90%",
						toggleActions: "play none none reverse",
					},
					yPercent: 0,
					opacity: 1,
					duration: 0.5,
					ease: "ease1",
					stagger: 0.003,
					delay: 0.8,
				});
			});
		}

		/*
			hero-4-title-animation
		*/
		if ($(".wa-split-up2hero").length) {
			var waSplitup2hero = $(".wa-split-up2hero");
			if (waSplitup2hero.length == 0) return;
			gsap.registerPlugin(SplitText);
			waSplitup2hero.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});

				let delayValue = $(el).attr("data-split-delay") || "0s";
				delayValue = parseFloat(delayValue) || 0;

				if ($(el).hasClass("wa-split-up2hero")) {
					gsap.set(el.split.chars, {
						scaleY: 1.5,
						opacity: 0,
					});
				}

				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						toggleActions: "play none none reverse",
					},
					opacity: 1,
					scaleY: 1,
					duration: 0.6,
					ease: "ease1",
					stagger: -0.08,
					delay: delayValue,
				});
			});
		}

		/*
			hero-4-title-animation
		*/
		if ($(".wa-split-up2").length) {
			var waSplitup2 = $(".wa-split-up2");
			if (waSplitup2.length == 0) return;
			gsap.registerPlugin(SplitText);
			waSplitup2.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});

				let delayValue = $(el).attr("data-split-delay") || "0s";
				delayValue = parseFloat(delayValue) || 0;

				if ($(el).hasClass("wa-split-up2")) {
					gsap.set(el.split.chars, {
						scaleY: 1.5,
						opacity: 0,
					});
				}

				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 86%",
						toggleActions: "play none none reverse",
					},
					opacity: 1,
					scaleY: 1,
					duration: 0.4,
					ease: "ease1",
					stagger: -0.1,
					delay: delayValue,
				});
			});
		}

		// section-title-8
		if ($(".nm-split2-3").length) {
			var split83 = $(".nm-split2-3");
			if (split83.length == 0) return;
			gsap.registerPlugin(SplitText);
			split83.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});

				// gsap.set(el, { perspective: 400 });

				if ($(el).hasClass("nm-split2-3")) {
					gsap.set(el.split.chars, {
						yPercent: 120,
					});
				}

				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 80%",
						toggleActions: "play none none reverse",
					},
					yPercent: 0,
					opacity: 1,
					duration: 0.3,
					ease: "ease1",
					stagger: 0.3,
				});
			});
		}
	});

	/*
	button-4-animation
*/
	if (document.querySelectorAll(".nm-pr-btn-4").length) {
		document.querySelectorAll(".nm-pr-btn-4").forEach((btn) => {
			const icon = btn.querySelector(".icon");
			const text = btn.querySelector(".text");

			function hoverEnter() {
				gsap.timeline()
					.to(icon, {
						left: "-100%",
						duration: 0.3,
						ease: "power4.in",
					})
					.to(icon, {
						left: "calc(100% - 44px)",
						rotation: -45,
						duration: 0.2,
						ease: "power4.in",
					});
				gsap.to(text, { x: -35, duration: 0.3, ease: "power4.in" });
			}

			function hoverLeave() {
				gsap.timeline()
					.to(icon, {
						left: "calc(200% - 44px)",
						duration: 0.3,
						ease: "power4.out",
					})
					.to(icon, {
						left: "3%",
						rotation: 0,
						duration: 0.2,
						ease: "power4.out",
					});
				gsap.to(text, { x: 0, duration: 0.3, ease: "power4.out" });
			}

			btn.addEventListener("mouseenter", hoverEnter);
			btn.addEventListener("mouseleave", hoverLeave);
		});
	}

	if (window.matchMedia("(min-width: 1200px)").matches) {
		var award4img = gsap.timeline({
			scrollTrigger: {
				trigger: ".nm-award-4-wrap",
				start: "top 80%",
				// end: "top -20%",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		award4img.to(".nm-award-4-img", {
			y: 300,
		});
	}

	$('.wa_marquee_left_not_pause_count').marquee({
		speed: 15,
		gap: 0,
		delayBeforeStart: 0,
		startVisible:true,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
	});

/*
    marquee-activation
*/
$('.wa_marquee').each(function () {

	let $this = $(this);

	let speed = $this.data('speed') || 20;
	let direction = $this.data('direction') || 'left';
	let pauseOnHover = $this.data('pause');

	if (pauseOnHover === undefined) {
		pauseOnHover = false;
	}

	$this.marquee({
		speed: speed,
		gap: 0,
		delayBeforeStart: 0,
		startVisible: true,
		direction: direction,
		duplicated: true,
		pauseOnHover: pauseOnHover,
	});

});

// about-5-features
const featureItems = document.querySelectorAll('.nm-about-5-features-single');
featureItems.forEach(item => {
  item.addEventListener('click', function () {
    featureItems.forEach(el => el.classList.remove('active'));
    this.classList.add('active');
  });
});

// team-5-scroll-animation
if (window.matchMedia("(min-width: 1400px)").matches) {

	var t5_scroll_ani = gsap.timeline({
		scrollTrigger: {
			trigger: ".nm-team-5-area",
			start: "top -100%",
			end: "bottom bottom",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	t5_scroll_ani.from(".nm-team-5-slider-single .img-single:nth-of-type(1) ", {
		y: 250
	});

	t5_scroll_ani.from(".nm-team-5-slider-single .img-single:nth-of-type(2) ", {
		y: 350
	},"<");

	t5_scroll_ani.from(".nm-team-5-slider-single .img-single:nth-of-type(3) ", {
		y: 220
	},"<");
	t5_scroll_ani.from(".nm-team-5-slider-single .img-single:nth-of-type(4) ", {
		y: 350
	},"<");
	t5_scroll_ani.from(".nm-team-5-slider-single .img-single:nth-of-type(5) ", {
		y: 350
	},"<");

	t5_scroll_ani.from(".nm-team-5-slider-single .img-single:nth-of-type(6) ", {
		y: 230
	},"<");

	t5_scroll_ani.from(".nm-team-5-slider-single .img-single:nth-of-type(7) ", {
		y: 370
	},"<");

	t5_scroll_ani.from(".nm-team-5-slider-single .img-single:nth-of-type(8) ", {
		y: 270
	},"<");

	t5_scroll_ani.from(".nm-team-5-slider-single .img-single:nth-of-type(9) ", {
		y: 350
	},"<");

	t5_scroll_ani.from(".nm-team-5-slider-single .content-wrap ", {
		opacity: 0,
		duration: .5,
	});

	t5_scroll_ani.from(".nm-team-5-slider-single .social-link ", {
		opacity: 0,
		duration: .5,
	},"<");

	t5_scroll_ani.from(".nm-team-5-slider-btn-wrap", {
		opacity: 0,
		duration: .5,
	},"<");

}


// price-5-toggle-class
if($(".nm-price-5-btn-toggle").length) {
	$('.nm-price-5-btn-toggle').on('click', function () {
		$(".nm-price-5-btn-toggle").toggleClass('active');
		$('.nm-price-5-card-single .price-wrap').toggleClass('active');
	});
}

/*
	process-1-animation
*/
if (window.matchMedia("(min-width: 1200px)").matches) {


	gsap.to(".p5_pin_elm", {
		scrollTrigger: {
			trigger: ".p5_pin_elm_trigger",
			start: "top 0%",
			end: "900px",
			pin: ".p5_pin_elm",
			pinSpacing: false,
			markers: false
		}
	});


	var p1ani = gsap.timeline({
		scrollTrigger: {
			trigger: ".p5_pin_elm_trigger",
			start: "top 0%",
			end: "900px",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	p1ani.to(".p5_ani_elm:nth-of-type(2)", {
		x: -413,
	});

	p1ani.to(".p5_ani_elm:nth-of-type(3)", {
		x: -413,
	},"<");

	p1ani.to(".p5_ani_elm:nth-of-type(3)", {
		x: -826,
	});


}


document.querySelectorAll(".wa_title_spilt_1").forEach((atEl) => {
	const atSplit = new SplitText(atEl, {
		type: "words,chars",
		wordsClass: "word",
		charsClass: "char"
	});

	let atDuration = parseFloat(atEl.getAttribute("data-speed")) || 1;
	let atDelay = parseFloat(atEl.getAttribute("data-delay")) || 0;

	if (window.innerWidth <= 768) {
		atDuration = atDuration * 0.3;
	}

	gsap.set(atSplit.words, {
		willChange: "transform",
		perspective: 1000,
		transformStyle: "preserve-3d"
	});

	gsap.set(atSplit.chars, {
		willChange: "transform",
		opacity: 0,
		rotateX: -80,
		transformOrigin: "center center -10px"
	});

	gsap.set(atEl, {
		perspective: 1000,
		transformStyle: "preserve-3d"
	});

	gsap.to(atSplit.chars, {
		scrollTrigger: {
			trigger: atEl,
			start: "top 80%",
		},
		opacity: 1,
		rotateX: 0,
		duration: atDuration,
		delay: atDelay,
		ease: "power3.out",
		stagger: {
			each: 0.05,
			from: "center",
			grid: "auto",
		},
	});
});


// blog-5-animation

if (window.matchMedia("(min-width: 1400px)").matches) {

	var blog5tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".nm-blog-5-area",
			start: "top top",
			end: "bottom bottom",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	blog5tl.to(".nm-blog-5-card:nth-of-type(1)", {
		x: -100,
		y: 100,
		autoAlpha: 0,
		scale: 1.1,
		duration: .5,
	});

	blog5tl.to(".nm-blog-5-card:nth-of-type(2)", {
		filter: "brightness(1) blur(0px)",
		transform: "translateZ(0px) translateY(0px) translateX(0px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg)",
		duration: .5,
	},"<20%");

	blog5tl.to(".nm-blog-5-card:nth-of-type(3)", {
		filter: "brightness(0.5) blur(2px)",
		transform: "translateZ(-400px) translateY(-50px) translateX(50px) scale(.5) rotate(0deg) rotateX(0deg) rotateY(0deg)",
		duration: .5,
	},"<20%");
	blog5tl.to(".nm-blog-5-card:nth-of-type(2)", {
		x: -100,
		y: 100,
		scale: 1.1,
		autoAlpha: 0,
		duration: .5,
	});
	blog5tl.to(".nm-blog-5-card:nth-of-type(3)", {
		filter: "brightness(1) blur(0px)",
		transform: "translateZ(0px) translateY(0px) translateX(0px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg)",
		duration: .5,
	},"<20%");


}

// contact-5-animation
if (window.matchMedia("(min-width: 1400px)").matches) {
	var contact5tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".nm-contact-5-area",
			start: "top 60%",
			end: "bottom bottom",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	contact5tl.from(".hand-img-1 img", {
		y: 150,
		scaleX: 1.1,
	});

	contact5tl.from(".hand-img-2 img", {
		y: 150,
		scaleX: 1.1,
	},"<");

	contact5tl.from(".nm-contact-5-box", {
		y: 100,
	},"<");
}




/*
	hero-2-animation
*/
const $wa_tilt_scale = $('.wa_tilt_scale');
const $wa_tilt_scale_target = $('.wa_tilt_scale_elm');

$wa_tilt_scale.on('mousemove', function (e) {
  const offset = $wa_tilt_scale.offset();
  const width = $wa_tilt_scale.outerWidth();
  const height = $wa_tilt_scale.outerHeight();

  const x = e.pageX - offset.left;
  const y = e.pageY - offset.top;

  const rotateY = ((x / width) - 0.5) * 20;
  const rotateX = ((y / height) - 0.5) * -20;

  $wa_tilt_scale_target.css({
    'transform': `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) `,
  });
});

$wa_tilt_scale.on('mouseleave', function () {
  $wa_tilt_scale_elm.css({
    'transform': 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
  });
});



/*
	section-title-1
*/
if ($(".sec_title_2").length) {
	var sec_title_2 = $(".sec_title_2");
	if (sec_title_2.length == 0) return;

	gsap.registerPlugin(SplitText);

	sec_title_2.each(function (index, el) {
		el.split = new SplitText(el, {
			type: "lines,words",
			linesClass: "split-line",
		});

		let delayValue = $(el).attr("data-split-delay") || "0s";
		delayValue = parseFloat(delayValue) || 0;

		if ($(el).hasClass("sec_title_2")) {
			gsap.set(el.split.words, {
				x: 30,
				filter: "blur(3px)",
				opacity: 0,
			});
		}

		el.anim = gsap.to(el.split.words, {
			scrollTrigger: {
				trigger: el,
				start: "top 90%",
				toggleActions: 'play none none reverse',
			},
			x: 0,
			filter: "blur(0px)",
			opacity: 1,
			duration: 1,

			ease: "ease1",
			stagger: 0.08,
			delay: delayValue,
		});
	});
}


// services-5-animation
if (window.matchMedia("(min-width: 1200px)").matches) {


	const items = document.querySelectorAll(".nm-services-5-item");
	const titles = document.querySelectorAll(".nm-services-5-item-title");
	const contents = document.querySelectorAll(".nm-services-5-item-content");

	let heights = [];

	contents.forEach((content, i) => {
	  gsap.set(content, { height: "auto" });
	  heights[i] = content.offsetHeight;
	  gsap.set(content, { height: 0 });
	});

	gsap.set(".nm-services-5-height", {
	  height: items.length * 100 + 200 + "vh"
	});

	let tl = gsap.timeline({
	  scrollTrigger: {
		trigger: ".nm-services-5-height",
		start: "top top",
		end: "bottom bottom",
		scrub: true,
	  }
	});

	items.forEach((item, i) => {

	  tl.addLabel("step" + i);

	  tl.to(contents[i], {
		height: heights[i],
		duration: 1,
		onStart: () => {
		  titles.forEach(t => t.classList.remove("active"));
		  titles[i].classList.add("active");
		}
	  });

	  if (i !== items.length - 1) {
		tl.to(contents[i], {
		  height: 0,
		  duration: 1
		});
	  }

	});

  }

})(jQuery);
