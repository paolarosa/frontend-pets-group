const baseUrl = "https://m2-api-adot-pet.herokuapp.com/"

async function allPets(){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njc2ODYzMDksImV4cCI6MTY2ODI5MTEwOSwic3ViIjoiYTI1YjAxZmEtZWFmNS00NDExLWFiZDktOTJkNTJjODQzZjg3In0.c9y8SCMeFiuIqms0U2a1IWruh0A6NPoqMqcHCo-4ubw"
    const request = await fetch(`${baseUrl}pets`,{
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const response = await request.json()
    return response
}

export{
    allPets
}


export async function login(email,password) {
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
    .then((response) => { console.log(response)
         if (!response.error) {
            localStorage.setItem("@KenzieCompany", JSON.stringify(response.token))
            window.location.replace("../homeUser/index.html")
        } else {
            console.log(response)
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } 
    }
    )
    return responseJSON
}

