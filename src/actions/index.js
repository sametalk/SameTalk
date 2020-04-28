import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, RESET_STORE } from '../constant'
import { 
    instagramGetData ,
    loginSameTalk, 
    sameTalkGetData, 
    registerUser,  
    getProfiles, 
    getInterests, 
    setInt, 
    deleteInt,
    getSelectedInt,
    getMatchs,
    updateDataUser,
    getCountries,
    setReward, 
    filter,
    getTags,
    discount,
    fetchListLikeMee
} from '../api'
import OneSignal from 'react-native-onesignal';

export const selectedInterests = (listInterests) => {
    return {
        type: 'selectedInterests',
        listInterests: listInterests
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

export const setListLikeMee = (listLikeMee) => {
    return {
        type: 'setListLikeMee',
        listLikeMee: listLikeMee
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

export const setListTags = (listTags) => {
    return {
        type: 'setListTags',
        listTags: listTags
    }
}

export const setCountTags = (listTags) => {
    var countTags = 0;
    listTags.forEach(tag => {
        countTags += tag.count
    });

    return {
        type: 'setCountTags',
        countTags: countTags
    }
}

export const setCoinsCount = (coins) => {
    return {
        type: 'setCoinsCount',
        coins: coins
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

export const addSelectedInterest = (interest) => {
    return {
       type: 'addSelectedInterest',
       payload: interest
    }
}

export const deleteSelectedInterest = (id) => {
    return {
       type: 'deleteSelectedInterest',
       payload: id
    }
}

export const login = (token, user_id) => {
    return async (dispatch) => {
        dispatch(getData())
        const dataInstagram = await instagramGetData(token, user_id) //Trae los datos del usuario de Instagram
        const loginST= await loginSameTalk(user_id)  //Loguea al usuario en el servidor de SameTalk
        console.log(dataInstagram);
        // Defino un nuevo usuario para luego almacenarlo en el Storage Centralizado
        const user = {
            token: '',
            instagram_id: user_id,
            username: dataInstagram.username,
            full_name: '',
            profile_picture: '',
            bio: '',
            follows: 0,
            followed_by: 0,
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
            user.id = dataSameTalk.id
            user.token = loginST.token
            user.full_name = dataSameTalk.full_name
            user.birthdate = dataSameTalk.birthdate
            user.age = dataSameTalk.age
            user.coins = dataSameTalk.coins
            user.gender = dataSameTalk.gender
            user.country = dataSameTalk.country
            user.profile_picture = dataSameTalk.profile_picture
            dispatch(userSetData(user)) // Almaceno el usuario que se autentico en el storage centralizado
            dispatch(getSelectedInterest(loginST.token)) // Traigo los intereses seleccionados por el usuario
            dispatch(getListProfiles(loginST.token)) //Traigo la lista de perfiles compatibles
            dispatch(getListMatchs(loginST.token)) //Trae los matchs del servidor
            dispatch(getListTags(user.token, user.id)) //Trae las etiquetas
            dispatch(getListLikeMee(user.token)); //Trae las personas que me dieron like
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
            console.log(user_ST)
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
        dispatch(addSelectedInterest({category: interest}))
        await setInt(interest, token_ST)
        dispatch(getDataSuccess([]))
    }
}

/*
    Funcion que trae los intereses de un usuario
*/
export const getSelectedInterest = ( token_ST ) => {
    return async (dispatch) => {
        dispatch(getData())
        const listInterests = await getSelectedInt(token_ST)
        dispatch(selectedInterests(listInterests))
        dispatch(getDataSuccess([]))
    }
}

// Funcion que elimina un interes seleccionado
export const deleteInterest = (token, id) => {
    return async (dispatch) => {
        dispatch(getData())
        dispatch(deleteSelectedInterest(id))
        await deleteInt(token, id)
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

// Obtiene las etiquetas que me dieron
export const getListTags = (token, id) => {
    return async (dispatch) => {
        dispatch(getData())
        const listTags = await getTags(token, id)
        dispatch(setListTags(listTags))
        dispatch(setCountTags(listTags))
        dispatch(getDataSuccess([]))
    }
}

//Descuenta monedas al usuario logueado
export const discountCoins = (user) => {
    return async (dispatch) => {
        dispatch(getData())
        const response = await discount(user)
        const userUpdate = await sameTalkGetData(user.token)
        dispatch(setCoinsCount(userUpdate.coins))
        dispatch(getDataSuccess([]))
    }
}

//Descuenta monedas al usuario logueado
export const getListLikeMee = (token) => {
    return async (dispatch) => {
        dispatch(getData())
        const listLike = await fetchListLikeMee(token)
        dispatch(setListLikeMee(listLike))
        dispatch(getDataSuccess([]))
    }
}
