export default (state = false, action) => {
    
    switch(action.type){

        /* 
            - Cambio el valor el modal de referidos
        */
        case 'changeReferredModalValue':
            if (state) {
                return false
            } else {
                return true
            }

        default:
            return state
    }   
}
