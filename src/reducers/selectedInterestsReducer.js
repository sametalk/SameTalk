export default (state = [], action) => {
    
    switch(action.type){
        case 'selectedInterests':
            return action.listInterests
        case 'addSelectedInterest':
            return [...state, action.payload]
        case 'deleteSelectedInterest':
            return state.filter(item => item.category.id !== action.payload)
        default:
            return state
    }   
}
