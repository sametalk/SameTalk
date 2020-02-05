export default (state = {}, action) => {

    switch (action.type) {
        case 'userSetData':
            console.log(action.user)
            return action.user
        case 'userUpdateData':
            console.log(action.user)
            return {
                ...state,
                age: action.user.age,
                country: action.user.country,
                full_name: action.user.full_name
            }
        default:
            return state
    }
}
