export default listMatchs = (state = [], action) => {
    switch (action.type) {
        case 'setListMatchs':
            return action.listMatchs
        default:
            return state
    }
}