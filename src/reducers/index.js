import {combineReducers} from 'redux'
import userData from './userReducer'
import interests from './interestsReducer'
import selectedInterests from './selectedInterestsReducer'
import listProfiles from './listProfilesReducer'
import fetchData from './fetchDataReducer'
import listMatchs from './listMatchsReducer'
import countries from './countriesReducer'

/*
    Aca se definen los estados y se le pasa la funcion reductora
*/
export default combineReducers({
    fetchData,
    userData,
    interests,
    selectedInterests,
    listProfiles,
    listMatchs,
    countries
})