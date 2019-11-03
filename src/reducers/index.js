import {combineReducers} from 'redux'
import user from './userReducer'
import interests from './interestsReducer'
import listProfiles from './listProfilesReducer'

export default combineReducers({
    userData: user,
    interests: interests,
    listProfiles: listProfiles
})