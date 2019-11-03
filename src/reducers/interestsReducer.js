export default (state = [], action) => {
    
    switch(action.type){

        /* 
            - Primero busco si el ID del interes ya se encuentra en el estado
            - Despues agrega o Elimina el ID del interes seleccionado a una matriz de objetos
        */
        case 'selectedInterests':
            let flag = false
            state.forEach(interest => {
                if(interest.id == action.interest.id){
                    flag = true
                }
            });
            if (flag) {
                state = state.filter(interest => interest.id !== action.interest.id)
            } else {
                state = state.concat(action.interest)
            }
            return state

        default:
            return state
    }   
}

