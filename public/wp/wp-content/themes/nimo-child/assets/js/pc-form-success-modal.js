/**
 * Shows CF7's success message in a modal instead of the inline strip.
 *
 * WHY THE MESSAGE IS READ FROM THE EVENT rather than hardcoded here: the five
 * forms do not share one confirmation. CF7 keeps the text per form, editable in
 * wp-admin, and `wpcf7mailsent` carries whatever that form is configured to
 * say. Copying the string into JS would freeze it, and the next person to edit
 * the message in wp-admin would watch it not change on the front end.
 *
 * ONE MODAL, NOT ONE PER FORM. A page can carry several forms (a service page's
 * panel plus the popup's), but only one can have just been submitted, so the
 * element is built once on demand and re-used. Building one per form would put
 * duplicate ids in the document.
 *
 * @package nimo-child
 */

( function () {
	'use strict';

	var modal      = null;
	var textEl     = null;
	var lastFocus  = null;

	/**
	 * Build the modal once, on first use.
	 *
	 * Deferred rather than built at load because most visitors never submit a
	 * form, and an empty dialog in every page's DOM is read out by some screen
	 * readers on navigation even when hidden.
	 *
	 * @return {HTMLElement} The modal root.
	 */
	function build() {

		var el = document.createElement( 'div' );

		el.className = 'pc-sent-modal';
		el.setAttribute( 'role', 'dialog' );
		el.setAttribute( 'aria-modal', 'true' );
		el.setAttribute( 'aria-labelledby', 'pc-sent-modal-title' );

		el.innerHTML =
			'<div class="pc-sent-modal__panel">' +
				'<button type="button" class="pc-sent-modal__x" aria-label="Close">&times;</button>' +
				'<div class="pc-sent-modal__tick" aria-hidden="true">' +
					'<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
						'<path d="M20 6L9 17l-5-5" stroke="#0e0e0e" stroke-width="3" ' +
						'stroke-linecap="round" stroke-linejoin="round"/>' +
					'</svg>' +
				'</div>' +
				'<h2 class="pc-sent-modal__title" id="pc-sent-modal-title">Thank you</h2>' +
				'<p class="pc-sent-modal__text"></p>' +
				'<button type="button" class="pc-sent-modal__close">Close</button>' +
			'</div>';

		// The backdrop dismisses, the panel does not — so a click that starts on
		// the panel and drifts onto the backdrop does not close the dialog.
		el.addEventListener( 'click', function ( event ) {
			if ( event.target === el ) {
				close();
			}
		} );

		el.querySelector( '.pc-sent-modal__x' ).addEventListener( 'click', close );
		el.querySelector( '.pc-sent-modal__close' ).addEventListener( 'click', close );

		document.body.appendChild( el );

		modal  = el;
		textEl = el.querySelector( '.pc-sent-modal__text' );

		return el;
	}

	/**
	 * @param {string} message Confirmation text from the form's CF7 settings.
	 * @return {void}
	 */
	function open( message ) {

		if ( ! modal ) {
			build();
		}

		// textContent, not innerHTML: the string comes back over the REST
		// response and is rendered as text by CF7 too.
		textEl.textContent = message;

		lastFocus = document.activeElement;

		modal.classList.add( 'is-open' );

		// Focus moves into the dialog so the next Tab is inside it and a screen
		// reader announces the confirmation rather than staying on the form.
		modal.querySelector( '.pc-sent-modal__close' ).focus();

		document.addEventListener( 'keydown', onKeydown );
	}

	/**
	 * @return {void}
	 */
	function close() {

		if ( ! modal ) {
			return;
		}

		modal.classList.remove( 'is-open' );

		document.removeEventListener( 'keydown', onKeydown );

		// Back to whatever had focus before — the submit button, normally — so
		// keyboard position is not lost.
		if ( lastFocus && typeof lastFocus.focus === 'function' ) {
			lastFocus.focus();
		}

		lastFocus = null;
	}

	/**
	 * @param {KeyboardEvent} event Key event.
	 * @return {void}
	 */
	function onKeydown( event ) {
		if ( 'Escape' === event.key || 'Esc' === event.key ) {
			close();
		}
	}

	document.addEventListener( 'wpcf7mailsent', function ( event ) {

		var message = '';

		if ( event.detail && event.detail.apiResponse ) {
			message = event.detail.apiResponse.message || '';
		}

		// A form with its confirmation text blanked out still deserves a modal;
		// falling back keeps the interruption even when the message is empty.
		open( message || 'Thank you for your message. It has been sent.' );
	} );
} )();
