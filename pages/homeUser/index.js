import { allPets } from "../../scripts/requestApi.js";

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
			if (
				element.avatar_url == "uma fotinha do bastião" ||
				(element.avatar_url == "uma fotinha do Sebastian" &&
					element.species == "Cachorro")
			) {
				imgPet.src = "/src/imgs/imgdog.svg";
			} else if (element.species == "Gato") {
				imgPet.src = "/src/imgs/imgcat.svg";
			}
			namePet.innerText = element.name;
			petRace.innerText = `Raça: ${element.bread}`;
			petSpecies.innerText = element.species;
			btn.innerText = "Me adota ?";

			divPet.append(namePet, petRace);
			li.append(imgPet, divPet, petSpecies, btn);
			ul.append(li);
		}
	});
}
renderAllpets();
