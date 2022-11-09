import { adoptPet, allPets } from "../../scripts/requestApi.js";
import { verifyPermissionAdmin } from "../../scripts/verifyPermission.js";
verifyPermissionAdmin()

function removeLocalStorage() {
	const btnLoggout = document.querySelector("#btnLoggout")
	btnLoggout.addEventListener("click", () => {
		localStorage.removeItem("@KenzieCompany")
	})
} removeLocalStorage()

async function renderAllpets() {
	const ul = document.getElementById("ulPets");
	const pets = await allPets();
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
			imgPet.classList.add("imgPets");
			divPet.classList.add("divPet");
			namePet.classList.add("namePets");
			petRace.classList.add("race");
			petSpecies.classList.add("species");
			btn.classList.add("btnAdopt");

			imgPet.src = element.avatar_url;
			namePet.innerText = element.name;
			petRace.innerText = `Raça: ${element.bread}`;
			petSpecies.innerText = element.species;
			btn.innerText = "Me adota ?";

			btn.addEventListener("click", () => {
				const adop = { pet_id: element.id }
				adoptPet(adop)
			})

			divPet.append(namePet, petRace);
			li.append(imgPet, divPet, petSpecies, btn);
			ul.append(li);
		}
	});
}
renderAllpets();
