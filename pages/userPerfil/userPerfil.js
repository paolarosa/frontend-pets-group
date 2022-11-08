import { myPets, renderMyProfile } from "../../scripts/requestApi.js";
import { verifyPermissionAdmin } from "../../scripts/verifyPermission.js";

verifyPermissionAdmin()

function logout(){
    const btn = document.querySelector("#removeLS")
    btn.addEventListener("click",()=>{
        localStorage.removeItem("@KenzieCompany")
    })
}logout()

async function renderProfileInfo(){
    const user = await renderMyProfile()
    const sectionProfile = document.querySelector(".profile-section")
    const divHeroBg = document.createElement("div")
    const divProfileImg = document.createElement("div")
    const imgBg = document.createElement("img")
    const divContainer = document.createElement("div")
    const divProfileContainer = document.createElement("div")
    const nameUser = document.createElement("h2")
    const email = document.createElement("p")
    const divProfileBtns = document.createElement("div")
    const btnUpdate = document.createElement("button")
    const btnDelete = document.createElement("button")


    divHeroBg.classList.add("hero-bg")
    divProfileImg.classList.add("profile-image")
    divContainer.classList.add("container")
    divProfileContainer.classList.add("profile-container")
    email.id = "email"
    divProfileBtns.classList.add("profile-buttons")
    btnUpdate.classList.add("btn","purple")
    btnUpdate.id = "updateInfo"
    btnDelete.classList.add("btn","alert")
    btnDelete.id = "deleteAccount"


    imgBg.src = user.avatar_url
    nameUser.innerText = user.name
    email.innerText = user.email
    btnUpdate.innerText = "Atualizar informações"
    btnDelete.innerText = "Deletar conta"


    divProfileImg.append(imgBg)
    divHeroBg.append(divProfileImg)
    divProfileBtns.append(btnUpdate,btnDelete)
    divProfileContainer.append(nameUser,email,divProfileBtns)
    divContainer.append(divProfileContainer)
    sectionProfile.append(divHeroBg,divContainer)

}renderProfileInfo()

async function renderMyPets(){
    const pets = await myPets()
    pets.forEach((element) => {
        console.log(element)
        
    });
}renderMyPets()