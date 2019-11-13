import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../constant'
import { instagramGetData , loginSameTalk, sameTalkGetData, registerUser,  getProfiles} from '../api'

export const selectedInterests = (interest) => {
    return {
        type: 'selectedInterests',
        interest: interest
    }
}

export const userSetData = (user) => {
    return {
        type: 'userSetData',
        user: user
    }
}

/*
    Manejadores de estados para las peticiones a API's
*/

export const getData = () => {
    return {
        type: FETCHING_DATA
    }
}

export const getDataSuccess = (data) => {
    return {
        type: FETCHING_DATA_SUCCESS,
        data
    }
}

export const getDataFailure = () => {
    return {
        type: FETCHING_DATA_FAILURE
    }
}

export const login = (token) => {
    return async (dispatch) => {
        dispatch(getData())
        const dataInstagram = await instagramGetData(token) //Trae los datos del usuario de Instagram
        const loginST= await loginSameTalk(dataInstagram.id)  //Loguea al usuario en el servidor de SameTalk

        // Defino un nuevo usuario para luego almacenarlo en el Storage Centralizado
        const user = {
            token: '',
            instagram_id: dataInstagram.id,
            username: dataInstagram.username,
            full_name: dataInstagram.full_name,
            profile_picture: dataInstagram.profile_picture,
            bio: dataInstagram.bio,
            follows: dataInstagram.counts.follows,
            followed_by: dataInstagram.counts.followed_by,
            age: '',
            coins: 0,
            gender: '',
            country_id: '',
            interests: []
        }

        // Pregunto si esta registrado, seteo los datos que me trae del servidor de SameTalk
        // Si no, tengo que registrarlo
        if (loginST.status === "ok") {
            const dataSameTalk = await sameTalkGetData(loginST.token) //Trae los datos del usuario registrado en SameTalk
            user.token = loginSameTalk.token
            user.age = dataSameTalk.age
            user.coins = dataSameTalk.coins
            user.gender = dataSameTalk.gender
            user.country_id = dataSameTalk.country
            dispatch(userSetData(user)) // Almaceno el usuario que se autentico en el storage centralizado
            dispatch(getDataSuccess([])) // Informo que el logueo finalizo correctamente
        } else {
            dispatch(userSetData(user)) //Almaceno los datos basico obtenidos de instagram
            dispatch(getDataFailure()) //Informo que el usuario se logueo pero no esta registrado en la aplicacion
        }
        
    }
}

/*
    Esta funcion envia al servidor un nuevo usuario con los datos seteados
    El servidor devuelve el usuario registrado con los datos como se almacenaron
    Se guarda el usuario con los datos devueltos por el servidor de SameTalk
*/
export const register = (user_IG) => {
    return async (dispatch) => {
        dispatch(getData())
        const user_ST = await registerUser(user_IG)
        dispatch(userSetData(user_ST))
        dispatch(getDataSuccess([]))
    }
}

export const getListProfiles = () => {
    return async (dispatch) => {
        dispatch(getData())
        const listProfiles = await getProfiles()
        dispatch(userSetData(user_ST))
        dispatch(getDataSuccess([]))
    }
}