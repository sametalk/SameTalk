import {combineReducers} from 'redux'
import user from './userReducer'
import interests from './interestsReducer'
import listProfiles from './listProfilesReducer'

/*
    Aca se definen los estados y se le pasa la funcion reductora
*/
export default combineReducers({
    userData: user,
    interests: interests,
    listProfiles: listProfiles
})