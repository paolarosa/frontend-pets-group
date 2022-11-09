import { register } from "../../scripts/requestApi.js"


async function captureInputRegister() {
    const buttonAcess = document.querySelector("#button-submit")
    let inputName = document.getElementById("name")
    let inputEmail = document.getElementById("email")
    let inputPassword = document.getElementById("password")
    let inputAvatar = document.getElementById("avatar_url")
    if (buttonAcess) {
        buttonAcess.addEventListener("click", async (event) => {
            event.preventDefault()
            await register(inputName.value, inputEmail.value, inputPassword.value, inputAvatar.value)
        })
    }
}
captureInputRegister()

export function toastRegister(actualResponse) {
    const divReturn = document.querySelector(".div-return-register")
    const message = document.createElement("p")

    if (actualResponse.message == "'avatar_url' is required" || actualResponse.message == "please inform a valid image link") {
        divReturn.classList.add("fail")
        message.innerText = "Digite um avatar válido!"
    }
    if (actualResponse.message == "'password' field is required") {
        message.innerText = "Digite uma senha!"
        divReturn.classList.add("fail")
    }
    if (actualResponse.message == "'email' field is required") {
        message.innerText = "Digite um e-mail!"
        divReturn.classList.add("fail")
    }
    if (actualResponse.message == 'please inform a valid email format') {
        message.innerText = "Digite um e-mail válido!"
        divReturn.classList.add("fail")
    }
    if (actualResponse.message == 'Email already in use') {
        message.innerText = "Email já existente!"
        divReturn.classList.add("fail")
    }
    if (!actualResponse.message) {
        message.innerText = "Conta criada com sucesso!"
        divReturn.classList.add("sucess")
    }
    divReturn.appendChild(message)
    divReturn.classList.remove("hidden")
}

