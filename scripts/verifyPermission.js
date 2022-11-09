export const verifyPermissionAdmin = async () => {
    const token = JSON.parse(localStorage.getItem("@KenzieCompany")) || ""

    if (token == "") {
        window.location.replace("/index.html")
    }
}
