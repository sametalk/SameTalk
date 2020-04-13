export default (state = {}, action) => {
    
    switch (action.type) {
        case 'userSetData':
            return action.user
        case 'userUpdateData':
            return {
                ...state,
                full_name: action.user.full_name,
                birthdate: action.user.birthdate,
                age: action.user.age,
                country: action.user.country
            }
        case 'userSetCountry':
            return {
                ...state,
                country: action.country
            }
        case 'setCoinsCount':
            return {
                ...state,
                coins: action.coins
            }
        default:
            return state
    }
}
