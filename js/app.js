var app = Vue.createApp({
	data() {
		return {
			activeSection: 'about'
		}
	},
	mounted() {
		var self = this;
		
		function rotateImages(elem, selector) {
		  selector = selector || 'img';
		  const regex = new RegExp('[0-9]+:[0-9]+:[a-zA-Z]+$');
		  var img = elem.querySelector(selector);

		  if (img) {
			if (img && regex.test(img.alt)) {
			  var n = img.alt.search(regex);
			  var filename = img.alt.slice(0, n);
			  var start, end, ext;
			  [start, end, ext] = img.alt.slice(n, 9999).split(':');

			  var tweens = [];
			  for (var i = Number(start); i <= Number(end); i++) {
				tweens.push({method: 'set', props: {attr: {src: filename + String(i) + '.' + ext}}});
				tweens.push({method: 'to', props: {autoAlpha:1, duration: 0.75}});
				tweens.push({method: 'to', props: {autoAlpha:0, duration: 0.75, delay: 1.5}});
			  }

			  var tl = gsap.timeline({repeat: -1});
			  tweens.forEach(function (item) {
				tl[item.method](img, item.props);
			  });

			  gsap.set(img, {attr: {src: filename + String(i) + '.' + ext}});
			  gsap.to(img, {autoAlpha:1, duration: 0.75});
			}
			img.alt = ''
		  }
		}

		function animateFrom(elem, direction) {
		  direction = direction || 1;
		  var x = 0,
			  y = direction * 100;
		  if(elem.classList.contains("reveal_left")) {
			x = -100;
			y = 0;
		  } else if (elem.classList.contains("reveal_right")) {
			x = 100;
			y = 0;
		  }
		  elem.style.transform = "translate(" + x + "px, " + y + "px)";
		  elem.style.opacity = "0";
		  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
			duration: 1.25,
			x: 0,
			y: 0,
			autoAlpha: 1,
			ease: "expo",
			overwrite: "auto"
		  });
		  
		  if (elem.id) { 
			self.activeSection = elem.id;
		  }
		  rotateImages(elem);
		}

		function hide(elem) {
		  gsap.set(elem, {autoAlpha: 0});
		}

		document.addEventListener("DOMContentLoaded", function() {
		  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

		  gsap.utils.toArray(".reveal").forEach(function(elem) {
			hide(elem); // assure that the element is hidden when scrolled into view

			ScrollTrigger.create({
			  trigger: elem,
			  onEnter: function() { animateFrom(elem) },
			  onEnterBack: function() { animateFrom(elem, -1) },
			  onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
			});
		  });

		  rotateImages(document, '#definitions');
		});

		window.addEventListener('load', function() {
			let message = { height: document.body.scrollHeight, width: document.body.scrollWidth };

			// window.top refers to parent window
			window.top.postMessage(message, "*");
		})	
	}
});

app.use(ElementPlus);;
app.mount('#app')