import { toastRegister } from "../pages/registro/registro.js"
import { getLocalStorage } from "./getLS.js"

const baseUrl = "https://m2-api-adot-pet.herokuapp.com/"

async function allPets() {
    const token = getLocalStorage()
    const request = await fetch(`${baseUrl}pets`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const response = await request.json()
    return response
}

async function login(email, password) {
    const data = {
        "email": email,
        "password": password
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    const responseJSON = await fetch('https://m2-api-adot-pet.herokuapp.com/session/login', options)
        .then((response) => response.json())
        .then((response) => {
            if (!response.message) {
                localStorage.setItem("@KenzieCompany", JSON.stringify(response.token))
                window.location.replace("../homeUser/index.html")
            } else {
                toast(response)
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        }
        )
    return responseJSON
}

async function register(name, email, password, avatar) {
    const data = {
        "name": name,
        "email": email,
        "password": password,
        "avatar_url": avatar
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const responseJSON = await fetch('https://m2-api-adot-pet.herokuapp.com/users', options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            if (!response.message) {
                toastRegister(response)
                setTimeout(() => {
                    window.location.replace("../login/login.html")
                }, 3000)
            } else {
                toastRegister(response)
                setTimeout(() => {
                    window.location.reload()
                }, 2500)
            }
        })
    return responseJSON
}

async function renderMyProfile() {
    const token = getLocalStorage()
    const request = await fetch(`${baseUrl}users/profile`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const response = await request.json()
    return response
}

async function myPets() {
    const token = getLocalStorage()
    const request = await fetch(`${baseUrl}pets/my_pets`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const response = await request.json()
    return response
}

async function deleteProfile() {
    const token = getLocalStorage()
    await fetch(`${baseUrl}users/profile`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

async function requestUpdatePetInfo(body, petId) {
    const token = getLocalStorage()
    try {
        const request = await fetch(`${baseUrl}pets/${petId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

async function adoptPet(body) {
    const token = getLocalStorage()
    try {
        const request = await fetch(`${baseUrl}adoptions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

async function registerPet(name, bread, specie, avatar) {
    console.log(name)
    console.log(bread)
    console.log(specie)
    console.log(avatar)

    const token = getLocalStorage()
    const data = {
        "name": name,
        "bread": bread,
        "species": specie,
        "avatar_url": avatar
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }
    const responseJSON = await fetch('https://m2-api-adot-pet.herokuapp.com/pets', options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
        })
    return responseJSON
}

export {
    allPets,
    login,
    register,
    renderMyProfile,
    myPets,
    deleteProfile,
    requestUpdatePetInfo,
    adoptPet,
    registerPet
}
