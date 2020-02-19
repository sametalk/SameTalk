export default (state = {}, action) => {

    switch (action.type) {
        case 'userSetData':
            return action.user
        case 'userUpdateData':
            return {
                ...state,
                full_name: action.user.full_name,
                age: action.user.age,
                country: action.user.country
            }
        case 'userSetCountry':
            return {
                ...state,
                country: action.country
            }
        default:
            return state
    }
}
