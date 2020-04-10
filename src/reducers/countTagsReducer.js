export default (state = 0, action) => {
    
    switch(action.type){

        /* 
            - Seteo el contador de tags
        */
        case 'setCountTags':
            return action.countTags

        default:
            return state
    }   
}
