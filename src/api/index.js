
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
        const response = await fetch(URL + `/users/self`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token_ST
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }

}

// Registra un nuevo usuario en el servidor de SameTalk
export const registerUser = async (user) => {
    try {
        // Obtener imagen de perfil de instagram
        const res = await fetch(`https://www.instagram.com/${user.username}/?__a=1`);
        const resJson = await res.json();
        user.profile_picture = resJson.graphql.user.profile_pic_url_hd;
        // Registrar usuario en backend
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

// Solicita la lista de perfiles
export const getProfiles = async (token_ST) => {
    try {
        const response = await fetch(URL + `/interests/predictions`, {
            headers: {
                "Authorization": "Bearer " + token_ST
            }
        })
        const res = await response.json()
        return res.message
    } catch (error) {
        console.log(error)
    }
}

// Solicita la lista de intereses
export const getInterests = async (token_ST) => {
    try {
        const response = await fetch(URL + `/categories`, {
            headers: {
                "Authorization": "Bearer " + token_ST
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// Guarda un interes seleccionado por el usuario en el servidor
export const setInt = async (interest, token_ST) => {
    try {
        const response = await fetch(URL + `/interests`, {
            method: "POST",
            body: JSON.stringify([{ cat_id: String(interest.id) }]),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token_ST
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export const deleteInt = async (token_ST, id) => {
    try {
        const response = await fetch(URL + `/interests/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token_ST
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
        const response = await fetch(URL + `/interests`, {
            headers: {
                "Authorization": "Bearer " + token_ST
            }
        })
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
                to_id: String(id)
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token_ST
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// Envia un Like a otro usuario
export const setSuperLike = async (token_ST, id) => {
    try {
        const response = await fetch(URL + `/matches/like`, {
            method: "POST",
            body: JSON.stringify({
                to_id: String(id),
                type: 'superlike'
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token_ST
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// Envia un No Like a otro usuario
export const setDontLike = async (token_ST, id) => {
    try {
        const response = await fetch(URL + `/matches/dontlike`, {
            method: "POST",
            body: JSON.stringify({
                to_id: String(id)
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token_ST
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// Consulta lista de matchs
export const getMatchs = async (token_ST) => {
    try {
        const response = await fetch(URL + `/matches`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token_ST
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// Actualizo perfil del usuario
export const updateDataUser = async (user) => {
    try {
        const response = await fetch(URL + `/users/self`, {
            method: "PUT",
            body: JSON.stringify({
                birthdate: user.birthdate,
                full_name: user.full_name,
                country_id: user.country.code
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            }
        })
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

// Consulta lista de matchs
export const setReward = async (user, coins, token) => {
    try {
        const response = await fetch(URL + "/users/" + user + "/reward/" + coins, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// Setea la recompensa
export const getCountries = async () => {
    try {
        const response = await fetch(URL + `/countries`)
        return await response.json()
    } catch{
        console.log(error)
    }
}

// Filtra perfiles compatibles
export const filter = async (token_ST, data) => {
    try {
        let pathFilter = '?';
        if  (data.age !== null) {
            pathFilter = pathFilter + 'age_more_than=' + data.age + '&' ;
        }
        if  (data.gender !== "") {
            pathFilter = pathFilter + 'gender=' + data.gender + '&' ;
        }
        if  (data.country !== "") {
            pathFilter = pathFilter + 'country=' + data.country;
        }
        const response = await fetch(URL + `/interests/predictions${pathFilter}`, {
            headers: {
                "Authorization": "Bearer " + token_ST
            }
        })
        const res = await response.json()
        return res.message
    } catch{
        console.log(error)
    }
}

//Etiquetar usuario
export const tagUser = async (token_ST, idTag, idUser) => {
    try {
        const response = await fetch(URL + `/tags/${idTag}/user/${idUser}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token_ST
            }
        })
        const res = await response.json()
        return res.message
    } catch{
        console.log(error)
    }
}

//Trae las etiquetas que se le pusieron al usuario logueado
export const getTags = async (token_ST, idUser) => {
    try {
        console.log(token_ST)
        const response = await fetch(URL + `/tags/user/${idUser}`, {
            headers: {
                "Authorization": "Bearer " + token_ST
            }
        })
        console.log(response)
        return response.json()
    } catch {
        console.log(error)
    }
}

//Descontar monedas
export const discount = async (user) => {
    try {
        const response = await fetch(URL + `/users/self`, {
            method: "PUT",
            body: JSON.stringify({
                coins: user.coins - 10,
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            }
        })
        console.log(response);
        return response.json()
    } catch {
        console.log(error)
    }
}

//Obtener quien me dio likes
export const fetchListLikeMee = async (token_ST) => {
    try {
        const response = await fetch(URL + `/matches/likedMe`, {
            headers: {
                "Authorization": "Bearer " + token_ST
            }
        })
        return response.json()
    } catch {
        console.log(error)
    }
}