export const verifyPermissionAdmin = async () => {
    const token = JSON.parse(localStorage.getItem("@KenzieCompany")) || ""

    console.log(token)
    if(token == ""){
        window.location.replace("/index.html")
    }
}
