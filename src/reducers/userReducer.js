export default (state = {}, action) => {
    
    switch(action.type){
        case 'userSetData':
            return action.user

        default:
            return state
    }   
}
