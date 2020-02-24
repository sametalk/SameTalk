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
export const getProfiles = async (token_ST) => {
    try {
        const response = await fetch(URL + `/interests/predictions?token=${token_ST}`)
        const res = await response.json()
        return res.message
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

// Guarda un interes seleccionado por el usuario en el servidor
export const setInt = async (interest, token_ST) => {
    try {
        const response = await fetch(URL + `/interests?token=${token_ST}`, {
            method: "POST",
            body: JSON.stringify([{ cat_id: String(interest.id) }]),
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

// Solicita la lista de intereses que fueron solicitados por el usuario autenticado
export const getSelectedInt = async (token_ST) => {
    try {
        const response = await fetch(URL + `/interests?token=${token_ST}`)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// Envia un Like a otro usuario
export const setLike = async (token_ST, id) => {
    try {
        const response = await fetch(URL + `/matches/like`, {
            method: "POST",
            body: JSON.stringify({
                token: token_ST,
                to_id: String(id)
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        return await response.json()
    } catch{
        console.log(error)
    }
}

// Envia un No Like a otro usuario
export const setDontLike = async (token_ST, id) => {
    try {
        const response = await fetch(URL + `/matches/dontlike`, {
            method: "POST",
            body: JSON.stringify({
                token: token_ST,
                to_id: String(id)
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        return await response.json()
    } catch{
        console.log(error)
    }
}

// Consulta lista de matchs
export const getMatchs = async (token_ST) => {
    try {
        const response = await fetch(URL + `/matches?token=${token_ST}`)
        return await response.json()
    } catch{
        console.log(error)
    }
}

// Actualizo perfil del usuario
export const updateDataUser = async (user) => {
    try {
        const response = await fetch(URL + `/users/self?token=${user.token}`, {
            method: "PUT",
            body: JSON.stringify({
                age: user.age,
                full_name: user.full_name,
                country_id: user.country.code
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        return await response.json();
    } catch{
        console.log(error)
    }
}

// Consulta lista de matchs
export const getCountries = async () => {
    try {
        const response = await fetch(URL + `/countries`)
        return await response.json()
    } catch{
        console.log(error)
    }
}