const body = document.querySelector("body")

function modal() {
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

async function openModal(children) {
	const backgroundContainer = document.createElement("section")
	backgroundContainer.classList.add("modalBackground")
	const mainContainer = document.createElement("section")
	mainContainer.classList.add("modalContainer")
	const closeModalButton = document.createElement("button")
	closeModalButton.classList.add("modalClose")

	closeModalButton.innerText = "X"

	backgroundContainer.addEventListener("click", (event) => {
		const { className } = event.target
		if (className === "modalBackground" || className === "modalClose") {
			backgroundContainer.remove()
		}
	})

	mainContainer.appendChild(closeModalButton)
	mainContainer.append(children)
	backgroundContainer.appendChild(mainContainer)
	body.appendChild(backgroundContainer)
}

export {
	modal,
	openModal
}
