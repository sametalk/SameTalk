export default (state = [], action) => {
    
    switch(action.type){
        case 'selectedInterests':
            return state.concat(action.interest)

        default:
            return state
    }   
}

