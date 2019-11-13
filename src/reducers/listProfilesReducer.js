export default listProfiles = (state = [], action) => {
    switch (action.type) {
        case 'setListProfiles':
            return action.profiles
        default:
            return state
    }
}