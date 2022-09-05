var app = Vue.createApp({
	data() {
		return {
			activeSection: 'standards'
		}
	},
	mounted() {
		var self = this;

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
		}

		function hide(elem) {
		  gsap.set(elem, {autoAlpha: 0});
		}

		document.addEventListener("DOMContentLoaded", function() {
		  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

		  gsap.utils.toArray(".reveal").forEach(function(elem) {
			if (animate) {
				hide(elem);

				ScrollTrigger.create({
				  trigger: elem,
				  onEnter: function() { animateFrom(elem) },
				  onEnterBack: function() { animateFrom(elem, -1) },
				  onLeave: function() { hide(elem) }
				});
			} else {
				elem.style.opacity = "100";
				elem.style.visibility = "visible";
			}
		  });
		});

		window.addEventListener('load', function() {
			let message = { height: document.body.scrollHeight, width: document.body.scrollWidth };
			window.top.postMessage(message, "*");
		})	
	}
});

app.use(ElementPlus);;
app.mount('#app')