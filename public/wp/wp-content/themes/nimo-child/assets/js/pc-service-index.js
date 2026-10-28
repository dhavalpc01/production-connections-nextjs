/**
 * Drive the Service Index preview panel.
 *
 * WHAT IT DOES, AND ALL IT DOES
 * -----------------------------
 * Moves an `is-active` class between the preview images of a `.pc-service-index`
 * section, and the matching `is-active` on the row that selected it. That is the
 * entire contract. It never hides anything, never writes an inline style on a
 * text node, and never gates copy behind a class it adds.
 *
 * WHY THAT MATTERS HERE. The two sections this component replaced both shipped
 * copy the reader could not see — `nm-about-5` held five of six descriptions at
 * `opacity: 0` behind an `.active` class, `nm-portfolio-4` held every card title
 * at `opacity: 0` with a 133px translate — and the page carries
 * assets/js/reveal-fallback.js specifically to repair that class of failure. This
 * script is written so that it can never be the cause of one: with it removed,
 * blocked, or erroring on line one, the section still renders every row, every
 * link, every word, and the first photograph, because the server marks image 0
 * `is-active` in the view.
 *
 * NO JQUERY, NO GSAP, NO DEPENDENCIES. Registered with an empty `$deps` in
 * nimo_child_register_component_assets() (inc/enqueue.php) and printed in the
 * FOOTER, so the markup it queries exists by the time it runs and it is never
 * ordered behind an animation library it has no relationship with. The same
 * contract as counter-fallback.js and reveal-fallback.js in this directory.
 *
 * WHY HOVER *AND* AN OBSERVER. Hover is the intended interaction and is what the
 * design is drawn around, but it does not exist on a touch screen. Below 992px
 * the preview panel is `display: none` and each row shows its own inline
 * thumbnail instead, so nothing is lost there — but the 992-1200px band includes
 * touch-capable laptops and tablets in landscape, where the panel IS shown and
 * hover may never fire. The IntersectionObserver covers that: whichever row is
 * nearest the middle of the viewport drives the panel. Hover wins while the
 * pointer is over the list, because an explicit gesture should beat an implicit
 * one.
 *
 * `focusin` IS NOT A CONVENIENCE. The rows are anchors, so a keyboard reader tabs
 * through them; without it the panel would sit on image 0 for the whole list
 * while the focus ring moved down it.
 *
 * SCOPED PER SECTION. Everything is queried from the section element rather than
 * from `document`, so two of these on one page cannot drive each other's panels.
 *
 * @package nimo-child
 */

( function () {
	'use strict';

	/*
	 * The width at which the preview panel appears. Must match the `min-width:
	 * 992px` block in assets/css/pc-components.css — below it the panel is
	 * `display: none` and there is nothing for this script to drive.
	 */
	var PANEL_MIN_WIDTH = 992;

	/**
	 * Wire one .pc-service-index section.
	 *
	 * @param {Element} section The section element.
	 * @return {void}
	 */
	function initSection( section ) {

		var previews = section.querySelectorAll( '[data-pc-preview]' );
		var rows     = section.querySelectorAll( '[data-pc-row]' );

		// One image or none: there is nothing to switch between.
		if ( previews.length < 2 || ! rows.length ) {
			return;
		}

		var hovering = false;

		/**
		 * Show the preview for one index.
		 *
		 * Reads the index off the element rather than trusting a captured loop
		 * variable, so a row added later by the Elementor editor's live preview is
		 * handled by the same code.
		 *
		 * @param {number} index Zero-based item index.
		 * @return {void}
		 */
		function show( index ) {

			var i;

			for ( i = 0; i < previews.length; i++ ) {
				previews[ i ].classList.toggle(
					'is-active',
					parseInt( previews[ i ].getAttribute( 'data-pc-preview' ), 10 ) === index
				);
			}

			for ( i = 0; i < rows.length; i++ ) {
				rows[ i ].classList.toggle(
					'is-active',
					parseInt( rows[ i ].getAttribute( 'data-pc-row' ), 10 ) === index
				);
			}
		}

		/**
		 * Read the index a row carries.
		 *
		 * @param {Element} row The row element.
		 * @return {number} Zero-based index, or -1 when unreadable.
		 */
		function indexOf( row ) {
			var value = parseInt( row.getAttribute( 'data-pc-row' ), 10 );
			return isNaN( value ) ? -1 : value;
		}

		Array.prototype.forEach.call( rows, function ( row ) {

			function activate() {
				var index = indexOf( row );

				if ( -1 === index ) {
					return;
				}

				hovering = true;
				show( index );
			}

			/*
			 * `mouseenter`, not `mouseover`: mouseover re-fires for every child the
			 * pointer crosses inside the row, which on a row holding a number, a
			 * heading, a paragraph and an SVG is a class write per child per move.
			 */
			row.addEventListener( 'mouseenter', activate );
			row.addEventListener( 'focusin', activate );
		} );

		section.addEventListener( 'mouseleave', function () {
			hovering = false;
		} );

		/*
		 * The touch and keyboard-scroll path. Deliberately NOT wired when the panel
		 * is hidden: below 992px each row carries its own thumbnail and the observer
		 * would be writing classes nothing reads.
		 *
		 * Guarded on IntersectionObserver rather than assumed — this is the only
		 * modern API the file uses, and the hover path above must keep working
		 * without it.
		 */
		if (
			'undefined' === typeof window.IntersectionObserver ||
			window.innerWidth < PANEL_MIN_WIDTH
		) {
			return;
		}

		var observer = new window.IntersectionObserver(
			function ( entries ) {

				// An explicit gesture beats an implicit one.
				if ( hovering ) {
					return;
				}

				var best      = null;
				var bestRatio = 0;
				var i;

				for ( i = 0; i < entries.length; i++ ) {
					if ( entries[ i ].isIntersecting && entries[ i ].intersectionRatio > bestRatio ) {
						best      = entries[ i ].target;
						bestRatio = entries[ i ].intersectionRatio;
					}
				}

				if ( best ) {
					show( indexOf( best ) );
				}
			},
			{
				/*
				 * A band across the middle of the viewport. The row occupying it is
				 * the one the reader is looking at, which is the one the panel should
				 * be showing.
				 */
				rootMargin: '-45% 0px -45% 0px',
				threshold: [ 0, 0.25, 0.5, 0.75, 1 ]
			}
		);

		Array.prototype.forEach.call( rows, function ( row ) {
			observer.observe( row );
		} );
	}

	/**
	 * Wire every section on the page.
	 *
	 * @return {void}
	 */
	function init() {
		Array.prototype.forEach.call(
			document.querySelectorAll( '[data-pc-service-index]' ),
			initSection
		);
	}

	if ( 'loading' === document.readyState ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

	/*
	 * The Elementor editor re-renders a widget in place on every control change,
	 * which replaces the markup this script bound to. Elementor exposes exactly
	 * this hook for the case; it is absent on the front end, so the guard is the
	 * whole integration.
	 */
	if ( window.elementorFrontend && window.elementorFrontend.hooks ) {
		window.elementorFrontend.hooks.addAction(
			'frontend/element_ready/nimo_child_service_index.default',
			function ( $scope ) {
				var el = $scope && $scope[ 0 ] ? $scope[ 0 ] : null;
				var section = el ? el.querySelector( '[data-pc-service-index]' ) : null;

				if ( section ) {
					initSection( section );
				}
			}
		);
	}
} )();
