//import listProfiles from '../constant/profiles'
//export default () => listProfiles

export default listProfiles = (state = [], action) => {
    switch (action.type) {
        case 'setListProfiles':
            console.log(action.listProfiles)
            return action.listProfiles
        default:
            return state
    }
}