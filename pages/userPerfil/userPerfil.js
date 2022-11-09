import { modal } from "../../scripts/modal.js";
import { deleteProfile, myPets, renderMyProfile } from "../../scripts/requestApi.js";
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
    email.innerHTML = `Email:${user.email}`
    btnUpdate.innerText = "Atualizar informações"
    btnDelete.innerText = "Deletar conta"
    btnUpdate.setAttribute("data-modal","update-modal")
    btnDelete.setAttribute("data-modal","delete-modal")

    btnUpdate.addEventListener("click",()=>{
        modal()
    })

    btnDelete.addEventListener("click",()=>{
       modal()
    })

    divProfileImg.append(imgBg)
    divHeroBg.append(divProfileImg)
    divProfileBtns.append(btnUpdate,btnDelete)
    divProfileContainer.append(nameUser,email,divProfileBtns)
    divContainer.append(divProfileContainer)
    sectionProfile.append(divHeroBg,divContainer)

}renderProfileInfo()

async function renderMyPets(){
    const pets = await myPets()
    const ul = document.querySelector("#petsList")
    pets.forEach((element) => {
        const li = document.createElement("li")
        const divListItem = document.createElement("div")
        const imgPet = document.createElement("img")
        const namePet = document.createElement("h3")
        const bread = document.createElement("p")
        const adopt = document.createElement("p")
        const btnAdopt = document.createElement("button")

        li.classList.add("pet-list")
        divListItem.classList.add("item-image")
        namePet.classList.add("item")
        bread.classList.add("item")
        adopt.classList.add("item")
        btnAdopt.classList.add("btn","purple")

        imgPet.src = element.avatar_url
        namePet.innerText = element.name
        bread.innerText = element.bread
        if(element.available_for_adoption){
            adopt.innerText = "Adotável: Sim"
        }else{
            adopt.innerText = "Adotável: Não"
        }
        btnAdopt.innerText = "Atualizar"
        btnAdopt.setAttribute("data-modal","updatePetInfo-modal")
        btnAdopt.addEventListener("click",()=>{
           modal()
        })

        divListItem.append(imgPet)
        li.append(divListItem,namePet,bread,adopt,btnAdopt)
        ul.append(li)

    });
}renderMyPets()

function deleteProfileUser(){
    const btnNoDelete = document.querySelector("#noDelete")
    const btnDelete = document.querySelector("#deleteAccount")

    btnNoDelete.addEventListener("click",()=>{
        const container = document.querySelector("#delete-modal")
        container.classList.remove("active")
    })

    btnDelete.addEventListener('click',()=>{
        deleteProfile()
        window.location.replace("/index.html")
    })

}deleteProfileUser()

function updatePetInfo(){

}