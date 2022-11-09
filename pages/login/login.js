import { login } from "../../scripts/requestApi.js"

async function captureInputLogin() {
    const buttonAcess = document.querySelector("form button")
    let inputEmail = document.getElementById("email")
    let inputPassword = document.getElementById("password")

    if (buttonAcess) {
        buttonAcess.addEventListener("click", async (event) => {
            event.preventDefault()
            await login(inputEmail.value, inputPassword.value)
        })
    }
}
captureInputLogin()

export function toast(actualResponse) {
    const divReturn = document.querySelector(".div-return")
    const message = document.createElement("p")

    if (actualResponse.message == "password is required") {
        message.innerText = "Digite uma senha válida!"
    }
    if (actualResponse.message == "email is required") {
        message.innerText = "Digite um e-mail válido!"
    }
    if (actualResponse.message == "please inform a valid email format") {
        message.innerText = "Senha ou e-mail incorretos!"
    }
    divReturn.appendChild(message)
    divReturn.classList.remove("hidden")
}