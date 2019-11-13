// Obtiene los datos del usuario de Instagram
export const instagramGetData = async (token_IG) => {
    const response = await fetch(`https://api.instagram.com/v1/users/self/?access_token=${token_IG}`)
    const res = await response.json()
    return res.data
}

const URL = "https://sametalk-back.herokuapp.com/api"

// Realiza el login en el servidor de SameTalk
export const loginSameTalk = async (instagram_id) => {
    const response = await fetch(URL + `/auth/login`, {
            method: "POST",
            body: JSON.stringify({ instagram_id }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
    return await response.json()
}

// Obtiene los datos del usuario de SameTalk
export const sameTalkGetData = async (token_ST) => {
    const response = await fetch(URL + `/users/self?token=${token_ST}`)
    return await response.json()
}

// Registra un nuevo usuario en el servidor de SameTalk
export const registerUser = async (user) => {
    const response = await fetch(URL + `/auth/register`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
    return await response.json()
}

// Solicita la lista de perfiles
export const getProfiles = async () => {
    const response = await fetch(URL + `/auth/register`, {
                method: "POST",
                body: JSON.stringify(),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
    return await response.json()
}