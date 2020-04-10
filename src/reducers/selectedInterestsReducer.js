export default (state = [], action) => {
    
    switch(action.type){
        case 'selectedInterests':
            return action.listInterests
        default:
            return state
    }   
}
