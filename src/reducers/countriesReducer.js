export default (state = [], action) => {
    
    switch(action.type){
        case 'setCountries':
            return action.countries

        default:
            return state
    }   
}