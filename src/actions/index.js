export const selectedInterests = (interest) => {
    return {
        type: 'selectedInterests',
        interest: interest
    }
}

export const userSetData = (user) => {
    return {
        type: 'userSetData',
        user: user
    }
}