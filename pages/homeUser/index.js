import { modal } from "../../scripts/modal.js";
import { adoptPet, allPets } from "../../scripts/requestApi.js";
import { verifyPermissionAdmin } from "../../scripts/verifyPermission.js";
verifyPermissionAdmin();

function removeLocalStorage() {
	const btnLoggout = document.querySelector("#btnLoggout");
	btnLoggout.addEventListener("click", () => {
		localStorage.removeItem("@KenzieCompany");
	});
}
removeLocalStorage();

async function renderAllpets() {
	const ul = document.getElementById("ulPets");
	const array = await allPets();
	const filteredArray = array.filter(
		(item) => item.available_for_adoption === true
	);

	const pets = filteredArray
		.map((i) => i.name)
		.map((name) => {
			return filteredArray.find((i) => i.name === name);
		})
		.slice(3, 14);

	console.log(pets);

	pets.forEach((element) => {
		if (element.available_for_adoption) {
			const li = document.createElement("li");
			const imgPet = document.createElement("img");
			const divPet = document.createElement("div");
			const namePet = document.createElement("h3");
			const petRace = document.createElement("p");
			const petSpecies = document.createElement("span");
			const btn = document.createElement("button");

			li.classList.add("liPets");
			li.id = element.id;
			imgPet.classList.add("imgPets");
			divPet.classList.add("divPet");
			namePet.classList.add("namePets");
			petRace.classList.add("race");
			petSpecies.classList.add("species");
			btn.classList.add("btnAdopt");
			btn.setAttribute("data-modal", "adopt-pet");

			imgPet.src = element.avatar_url;
			namePet.innerText = element.name;
			petRace.innerText = `Raça: ${element.bread}`;
			petSpecies.innerText = element.species;
			btn.innerText = "Me adota ?";

			divPet.append(namePet, petRace);
			li.append(imgPet, divPet, petSpecies, btn);
			ul.append(li);
		}
	});

	const adoptModal = document.getElementById("adopt-pet");
	const adotarBtn = adoptModal.querySelector("#adotar");
	const buttons = document.querySelectorAll(".liPets button");

	buttons.forEach((btn) => {
		btn.addEventListener("click", ({ target }) => {
			const adop = { pet_id: target.parentElement.id };

			adotarBtn.addEventListener("click", () => {
				adoptPet(adop);
				window.location.reload();
			});
		});
	});

	modal();
}
renderAllpets();
