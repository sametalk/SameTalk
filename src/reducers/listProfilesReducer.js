export default listProfiles = (state = [], action) => {
    switch (action.type) {
        case 'setListProfiles':
            return action.listProfiles
        default:
            return state
    }
}