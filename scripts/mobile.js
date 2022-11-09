export default function initMobile() {
	const btn = document.querySelector(".btn-mobile");

	if (btn) {
		function toggleNav(event) {
			if (event.type === "touchstart") event.preventDefault();
			const nav = document.querySelector(".nav");
			nav.classList.toggle("active");
		}

		btn.addEventListener("click", toggleNav);
		btn.addEventListener("touchstart", toggleNav);
	}
}
