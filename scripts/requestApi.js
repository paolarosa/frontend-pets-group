import { toastRegister } from "../pages/registro/registro.js"

const baseUrl = "https://m2-api-adot-pet.herokuapp.com/"

async function allPets() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njc2ODYzMDksImV4cCI6MTY2ODI5MTEwOSwic3ViIjoiYTI1YjAxZmEtZWFmNS00NDExLWFiZDktOTJkNTJjODQzZjg3In0.c9y8SCMeFiuIqms0U2a1IWruh0A6NPoqMqcHCo-4ubw"
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

export {
    allPets,
    login
}


export async function register(name, email, password, avatar) {
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
