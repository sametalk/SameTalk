export default (state = [], action) => {
    
    switch(action.type){

        /* 
            - Seteo los intereses con la lista que obtengo de la api
        */
        case 'setListInterests':
            return action.listInterests

        default:
            return state
    }   
}
