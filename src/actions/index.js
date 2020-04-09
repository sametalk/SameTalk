import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, RESET_STORE } from '../constant'
import { 
    instagramGetData ,
    loginSameTalk, 
    sameTalkGetData, 
    registerUser,  
    getProfiles, 
    getInterests, 
    setInt, 
    getSelectedInt,
    getMatchs,
    updateDataUser,
    getCountries,
    setReward, 
    filter
} from '../api'
import OneSignal from 'react-native-onesignal';

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

export const userSetCountry = (country) => {
    return {
        type: 'userSetCountry',
        country: country
    }
}

export const userUpdateData = (user) => {
    return {
        type: 'userUpdateData',
        user: user
    }
}

export const setListInterests = (listInterests) => {
    return {
        type: 'setListInterests',
        listInterests: listInterests
    }
}

export const setListProfiles = (listProfiles) => {
    return {
        type: 'setListProfiles',
        listProfiles: listProfiles
    }
}

export const setListMatchs = (listMatchs) => {
    return {
        type: 'setListMatchs',
        listMatchs: listMatchs
    }
}

export const setCountries = (countries) => {
    return {
        type: 'setCountries',
        countries: countries
    }
}

export const changeReferredModalValue = () => {
    return {
        type: 'changeReferredModalValue'
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

export const resetStore = () => {
    return {
        type: RESET_STORE
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
            birthdate: '',
            age: '',
            coins: 0,
            gender: '',
            country: '',
            country_id: '',
            interests: []
        }

        dispatch(getCountriesList())
        
        // Pregunto si esta registrado, seteo los datos que me trae del servidor de SameTalk
        // Si no, tengo que registrarlo
        if (loginST.status === "ok") {
            const dataSameTalk = await sameTalkGetData(loginST.token) //Trae los datos del usuario registrado en SameTalk
            user.token = loginST.token
            user.full_name = dataSameTalk.full_name
            user.birthdate = dataSameTalk.birthdate
            user.age = dataSameTalk.age
            user.coins = dataSameTalk.coins
            user.gender = dataSameTalk.gender
            user.country = dataSameTalk.country
            dispatch(userSetData(user)) // Almaceno el usuario que se autentico en el storage centralizado
            dispatch(getSelectedInterest(loginST.token)) // Traigo los intereses seleccionados por el usuario
            dispatch(getListProfiles(loginST.token)) //Traigo la lista de perfiles compatibles
            dispatch(getListMatchs(loginST.token)) //Trae los matchs del servidor
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
        OneSignal.init("05fc4295-e955-49d7-adc0-5921cc1357de", {kOSSettingsKeyAutoPrompt : true});
        dispatch(getData())
        OneSignal.addEventListener('ids', async function(device) {
            user_IG.player_id = device.userId
            const user_ST = await registerUser(user_IG)
            dispatch(userSetData(user_ST))
            dispatch(getDataSuccess([]))
        });
    }
}

/*
    Esta funcion envia al servidor un usuario con los datos editados
*/
export const updateUser = (user) => {
    return async (dispatch) => {
        dispatch(getData())
        const userUpdate = await updateDataUser(user)
        dispatch(userUpdateData(userUpdate))
        dispatch(getDataSuccess([]))
    }
}

/*
    Funcion que solicita la lista de los perfiles compatibles con el usuario registrado
*/
export const getListProfiles = (token_ST) => {
    return async (dispatch) => {
        dispatch(getData())
        const listProfiles = await getProfiles(token_ST)
        dispatch(setListProfiles(listProfiles))
        dispatch(getDataSuccess([]))
    }
}

/*
    Funcion que solicita la lista de intereses
*/
export const getListInterests = (token_ST) => {
    return async (dispatch) => {
        dispatch(getData())
        const listInterests = await getInterests(token_ST)
        dispatch(setListInterests(listInterests))
        dispatch(getDataSuccess([]))
    }
}

/*
    Funcion que guarda un interes en el servidor
*/
export const setInterest = (interest, token_ST) => {
    return async (dispatch) => {
        dispatch(getData())
        const response = await setInt(interest, token_ST)
        if (response.status !== "error"){
            dispatch(selectedInterests(interest))
        }
        dispatch(getDataSuccess([]))
    }
}

/*
    Funcion que trae los intereses de un usuario
*/
export const getSelectedInterest = ( token_ST ) => {
    return async (dispatch) => {
        dispatch(getData())
        const interests = await getSelectedInt(token_ST)

        // Hago esto para pasar al formato y que sea compatible cuando agrego un interes al dar click
        let newArray = []
        interests.map(i => {
            let obj = {
                id: i.category.id,
                name: i.category.name,
                children: []
            }
            newArray.push(obj)
        });
        // --------------------

        dispatch(selectedInterests(newArray))
        dispatch(getDataSuccess([]))
    }
}

//Trae la lista de matchs
export const getListMatchs = ( token_ST ) => {
    return async (dispatch) => {
        dispatch(getData())
        const matchs = await getMatchs(token_ST)
        dispatch(setListMatchs(matchs))
        dispatch(getDataSuccess([]))
    }
}

//Trae la lista de paises
export const getCountriesList = () => {
    return async (dispatch) => {
        dispatch(getData())
        const countries = await getCountries()
        dispatch(setCountries(countries))
        dispatch(getDataSuccess([]))
    }
}

//Setea coins por recomendacion
export const setRewardForRecommendation = (user, token) => {
    return async (dispatch) => {
        dispatch(getData())
        const reward = await setReward(user, 10, token)
        dispatch(getDataSuccess([]))
    }
}

//Filtra los perfiles compatibles
export const filterProfiles = (token, data) => {
    return async (dispatch) => {
        dispatch(getData())
        const listProfiles = await filter(token, data)
        dispatch(setListProfiles(listProfiles))
        dispatch(getDataSuccess([]))
    }
}


// Reset store
export const cleanStore = () => {
    return dispatch => {
        dispatch(resetStore())
    }
}