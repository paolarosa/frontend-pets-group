import { modal } from "../../scripts/modal.js";
import {
	deleteProfile,
	myPets,
	registerPet,
	renderMyProfile,
	requestUpdatePetInfo,
} from "../../scripts/requestApi.js";
import { verifyPermissionAdmin } from "../../scripts/verifyPermission.js";
import { getLocalStorage } from "../../scripts/getLS.js";

verifyPermissionAdmin();

function logout() {
	const btn = document.querySelector("#removeLS");
	btn.addEventListener("click", () => {
		localStorage.removeItem("@KenzieCompany");
	});
}
logout();

async function renderProfileInfo() {
	const user = await renderMyProfile();
	const sectionProfile = document.querySelector(".profile-section");
	const divHeroBg = document.createElement("div");
	const divProfileImg = document.createElement("div");
	const imgBg = document.createElement("img");
	const divContainer = document.createElement("div");
	const divProfileContainer = document.createElement("div");
	const nameUser = document.createElement("h2");
	const email = document.createElement("p");
	const divProfileBtns = document.createElement("div");
	const btnUpdate = document.createElement("button");
	const btnDelete = document.createElement("button");

	divHeroBg.classList.add("hero-bg");
	divProfileImg.classList.add("profile-image");
	divContainer.classList.add("container");
	divProfileContainer.classList.add("profile-container");
	email.id = "email";
	divProfileBtns.classList.add("profile-buttons");
	btnUpdate.classList.add("btn", "purple");
	btnUpdate.id = "updateInfo";
	btnDelete.classList.add("btn", "alert");
	btnDelete.id = "deleteAccount";

	imgBg.src = user.avatar_url;
	nameUser.innerText = user.name;
	email.innerText = user.email;
	btnUpdate.innerText = "Atualizar informações";
	btnDelete.innerText = "Deletar conta";
	btnUpdate.setAttribute("data-modal", "update-modal");
	btnDelete.setAttribute("data-modal", "delete-modal");

	btnUpdate.addEventListener("click", () => {
		modal()
		const updateForm = document.getElementById('updateForm')
		const elements = [...updateForm.elements]
		const divReturn = document.querySelector(".div-return")
		const message = document.createElement("p")
		updateForm.addEventListener('submit', async (e) => {
			e.preventDefault()
			try {
				const data = {}

				elements.forEach(element => {
					if (element.tagName == "INPUT" && element.value !== '') {
						data[element.id] = element.value
					}
				})
				const options = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${getLocalStorage()}`
					},
					body: JSON.stringify(data)
				}

				const responseJSON = await fetch('https://m2-api-adot-pet.herokuapp.com/users/profile', options)
				const response = await responseJSON.json()


				if (!response.message) {
					window.location.reload()
				}
				if (response.message === 'please inform a valid image link') {
					message.innerText = 'Por favor insira um link de imagem valido'
					divReturn.classList.remove("hidden")
					divReturn.appendChild(message)
				}
			}
			catch (err) {
				console.log(err)
			}
		})

	})

	divProfileImg.append(imgBg);
	divHeroBg.append(divProfileImg);
	divProfileBtns.append(btnUpdate, btnDelete);
	divProfileContainer.append(nameUser, email, divProfileBtns);
	divContainer.append(divProfileContainer);
	sectionProfile.append(divHeroBg, divContainer);

	modal()
}
renderProfileInfo();

async function renderMyPets() {
	const pets = await myPets();
	const ul = document.querySelector("#petsList");
	pets.forEach((element) => {
		const li = document.createElement("li");
		const divListItem = document.createElement("div");
		const info = document.createElement("div");
		const imgPet = document.createElement("img");
		const namePet = document.createElement("h3");
		const bread = document.createElement("p");
		const adopt = document.createElement("p");
		const btnAdopt = document.createElement("button");

		li.classList.add("list-item");
		divListItem.classList.add("item-image");
		info.classList.add("info");
		namePet.classList.add("item");
		bread.classList.add("item");
		adopt.classList.add("item");
		btnAdopt.classList.add("btn", "purple", "att");

		imgPet.src = element.avatar_url;
		namePet.innerText = `Nome: ${element.name}`;
		bread.innerText = `Espécie: ${element.bread}`;
		if (element.available_for_adoption) {
			adopt.innerText = "Adotável: Sim";
		} else {
			adopt.innerText = "Adotável: Não";
		}
		btnAdopt.innerText = "Atualizar";

		btnAdopt.setAttribute("data-modal", "update-pet");

		divListItem.append(imgPet);
		info.append(namePet, bread, adopt, btnAdopt);
		li.append(divListItem, info);
		ul.append(li);

		modal()
	});
}
renderMyPets();

function deleteProfileUser() {
	const btnNoDelete = document.querySelector("#noDelete");
	const btnDelete = document.querySelector("#deleteAccount");

	btnNoDelete.addEventListener("click", () => {
		const container = document.querySelector("#delete-modal");
		container.classList.remove("active");
	});

	btnDelete.addEventListener("click", () => {
		deleteProfile();
		window.location.replace("/index.html");
	});
}
deleteProfileUser();

async function updatePetInfo() {
	const pets = await myPets();
	const btn = document.querySelector("#button-att");
	const input = document.querySelector("#inputPet");
	pets.forEach((element) => {
		btn.addEventListener("click", async (event) => {
			const edit = {
				name: element.name,
				bread: element.bread,
				species: element.species,
				avatar_url: input.value,
			};
			await requestUpdatePetInfo(edit, element.id);
			window.location.replace("/pages/userPerfil/index.html");
		});
	});
}
updatePetInfo();

async function captureInputRegisterPet() {
	const buttonRegister = document.getElementById("button-submit-pet");
	const inputName = document.getElementById("name");
	const inputBread = document.getElementById("bread");
	const selectSpecie = document.getElementById("select-specie");
	const inputAvatar = document.getElementById("avatar_url");
	buttonRegister.addEventListener("click", async (event) => {
		event.preventDefault();

		await registerPet(
			inputName.value,
			inputBread.value,
			selectSpecie.value,
			inputAvatar.value
		);
		window.location.reload();
	});
}
captureInputRegisterPet();
