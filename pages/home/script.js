function butsHome() {
    const butLogin = document.querySelectorAll('.butLogin')
    const butRegister = document.querySelectorAll('.butRegister')

    butLogin.forEach(element => {
        element.addEventListener('click', () => {
            window.location.replace('./pages/login/login.html')
        })
    })

    butRegister.forEach(element => {
        element.addEventListener('click', () => {
            window.location.replace('')
        })
    })
}
butsHome()