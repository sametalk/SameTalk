import {combineReducers} from 'redux'
import user from './userReducer'
import interests from './interestsReducer'
import listProfiles from './listProfilesReducer'
import data from './dataReducer'

/*
    Aca se definen los estados y se le pasa la funcion reductora
*/
export default combineReducers({
    data: data,
    userData: user,
    interests: interests,
    listProfiles: listProfiles
})