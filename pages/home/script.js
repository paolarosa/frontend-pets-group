function openModal () {
    const IMGModal = document.querySelector('.IMGModal')
    const modalLogin = document.querySelector('.modalLogin')

    IMGModal.addEventListener('click', () => {
        modalLogin.classList.toggle('hide')
    })
}
openModal()

function butsHome () {
    const butLogin = document.querySelectorAll('.butLogin')
    const butRegister = document.querySelectorAll('.butRegister')

    butLogin.forEach(element => {
        element.addEventListener('click', () => {
            window.location.replace('./pages/login/login.html')
        })
    })

    butRegister.forEach(element => {
        element.addEventListener('click', () => {
            //window.location.replace('')
        })
    })
}
butsHome()