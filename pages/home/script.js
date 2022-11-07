function openModal () {
    const IMGModal = document.querySelector('.IMGModal')
    const modalLogin = document.querySelector('.modalLogin')

    IMGModal.addEventListener('click', () => {
        modalLogin.classList.toggle('hide')
    })
}
openModal()