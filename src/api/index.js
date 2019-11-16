// Obtiene los datos del usuario de Instagram
export const instagramGetData = async (token_IG) => {
    try {
        const response = await fetch(`https://api.instagram.com/v1/users/self/?access_token=${token_IG}`)
        const res = await response.json()
        return res.data
    } catch (error) {
        console.log(error)
    }
    
}

const URL = "https://sametalk-back.herokuapp.com/api"

// Realiza el login en el servidor de SameTalk
export const loginSameTalk = async (instagram_id) => {
    try {
        const response = await fetch(URL + `/auth/login`, {
            method: "POST",
            body: JSON.stringify({ instagram_id }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
    return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// Obtiene los datos del usuario de SameTalk
export const sameTalkGetData = async (token_ST) => {
    try {
        const response = await fetch(URL + `/users/self?token=${token_ST}`)
        return await response.json()    
    } catch (error) {
        console.log(error)
    }
    
}

// Registra un nuevo usuario en el servidor de SameTalk
export const registerUser = async (user) => {
    try {
        const response = await fetch(URL + `/auth/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        return await response.json()    
    } catch (error) {
        console.log(error)
    }
    
}

// Solicita la lista de perfiles INCOMPLETOO HAY QUE CAMBIAR TODO
export const getProfiles = async () => {
    try {
        const response = await fetch(URL + `/auth/register`, {
            method: "POST",
            body: JSON.stringify(),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// Solicita la lista de intereses
export const getInterests = async (token_ST) => {
    try {
        const response = await fetch(URL + `/categories?token=${token_ST}`)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}