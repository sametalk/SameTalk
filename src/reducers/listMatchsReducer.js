export default listMatchs = (state = [], action) => {
    switch (action.type) {
        case 'setListMatchs':
            console.log(action.listMatchs)
            return action.listMatchs
        default:
            return state
    }
}