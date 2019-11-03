export default (state = {}, action) => {
    
    switch(action.type){
        case 'userSetData':
            console.log(action.user)
            return action.user

        default:
            return state
    }   
}
