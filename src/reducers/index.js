import {combineReducers} from 'redux'
import userData from './userReducer'
import interests from './interestsReducer'
import selectedInterests from './selectedInterestsReducer'
import listProfiles from './listProfilesReducer'
import fetchData from './fetchDataReducer'
import listMatchs from './listMatchsReducer'
import countries from './countriesReducer'
import showReferredModal from './showReferredModalReducer'
import { RESET_STORE } from '../constant'

/*
    Aca se definen los estados y se le pasa la funcion reductora
*/

const appReducer = combineReducers({
    fetchData,
    userData,
    interests,
    selectedInterests,
    listProfiles,
    listMatchs,
    countries,
    showReferredModal
})
  
export default rootReducer = (state, action) => {
    if (action.type === RESET_STORE) {
        state = undefined
    }
    return appReducer(state, action)
}