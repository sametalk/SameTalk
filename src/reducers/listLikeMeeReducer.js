export default (state = [], action) => {
    
    switch(action.type){
        /* 
            - Seteo la lista de personas que le dieron like al usuario logueado
        */
        case 'setListLikeMee':
            return action.listLikeMee

        default:
            return state
    }   
}
