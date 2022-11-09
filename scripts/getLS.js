export const getLocalStorage = () => {
    const token = JSON.parse(localStorage.getItem("@KenzieCompany")) || ""

    return token
}