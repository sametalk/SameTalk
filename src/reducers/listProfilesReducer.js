export default listProfiles = (state = [], action) => {
    switch (action.type) {
        case 'setListProfiles':
            console.log(action.listProfiles)
            return Object.keys(action.listProfiles).map((k) => action.listProfiles[k])
        default:
            return state
    }
}