export default listTags = (state = [], action) => {
    switch (action.type) {
        case 'setListTags':
            return action.listTags
        default:
            return state
    }
}