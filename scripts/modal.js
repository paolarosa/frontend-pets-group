export default function modal() {
	const modalButtons = document.querySelectorAll("[data-modal]");

	modalButtons.forEach((btn) => {
		btn.addEventListener("click", openModal);
	});

	function openModal(e) {
		const modalId = e.target.getAttribute("data-modal");

		const modalWrapper = document.getElementById(modalId);

		modalWrapper.classList.add("active");

		closeModal(modalWrapper);
		outsideClick(modalWrapper);
	}

	function outsideClick(modalWrapper) {
		window.addEventListener("click", (e) => {
			if (e.target === modalWrapper) {
				modalWrapper.classList.remove("active");
			}
		});
	}

	function closeModal(modalWrapper) {
		const closeBtn = modalWrapper.querySelectorAll(".close");

		closeBtn.forEach((btn) => {
			btn.addEventListener("click", () => {
				modalWrapper.classList.remove("active");
			});
		});
	}
}
modal();
