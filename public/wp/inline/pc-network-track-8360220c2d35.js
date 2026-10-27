(function () {
		var track = document.querySelector('.pc-network-track');
		if (!track || track.children.length < 2) {
			return;
		}
		if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}
		var busy = false, visible = true;

		function step() {
			if (busy || !visible || document.hidden) {
				return;
			}
			busy = true;
			var first = track.firstElementChild;
			var shift = first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
			first.classList.add('is-leaving');
			track.style.transition = 'transform .9s cubic-bezier(.65,0,.35,1)';
			track.style.transform = 'translateX(' + (-shift) + 'px)';
			track.addEventListener('transitionend', function done(e) {
				if (e.target !== track) {
					return;
				}
				track.removeEventListener('transitionend', done);
				track.style.transition = 'none';
				first.classList.remove('is-leaving');
				track.appendChild(first);
				track.style.transform = 'translateX(0)';
				busy = false;
			});
		}

		if ('IntersectionObserver' in window) {
			new IntersectionObserver(function (entries) {
				visible = entries[0].isIntersecting;
			}).observe(track);
		}
		setInterval(step, 3000);
	})();
