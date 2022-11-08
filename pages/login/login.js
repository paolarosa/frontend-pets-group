import { login } from "../../scripts/requestApi.js"

function captureInputLogin(){
    const buttonAcess = document.querySelector(".button-send")
    let inputEmail = document.getElementById("email")
    let inputPassword = document.getElementById("password")

    buttonAcess.addEventListener("click", async (event) => {
        event.preventDefault()
        login(inputEmail.value,inputPassword.value)
})
}
captureInputLogin()

