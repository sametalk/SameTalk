import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../constant'
import { apiGetUser } from '../api'

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

/*
    Manejadores de estados para las peticiones a API's
*/

export const getData = () => {
    return {
        type: "FETCHING_DATA"
    }
}

export const getDataSuccess = (data) => {
    return {
        type: "FETCHING_DATA_SUCCESS",
        data
    }
}

export const getDataFailure = () => {
    return {
        type: "FETCHING_DATA_FAILURE"
    }
}

export const login = (token) => {
    return async (dispatch) => {
        dispatch(getData())
        const response = await fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
        const res = await response.json()

        const response2 = await fetch(`https://sametalk-back.herokuapp.com/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({ instagram_id: res.data.id }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        res2 = await response2.json()

        const user = {
            token: '',
            instagram_id: res.data.id,
            username: res.data.username,
            full_name: res.data.full_name,
            profile_picture: res.data.profile_picture,
            bio: res.data.bio,
            follows: res.data.counts.follows,
            followed_by: res.data.counts.followed_by,
            age: '',
            coins: 0,
            gender: '',
            country_id: '',
            interests: []
        }

        if (res2.status === "ok") {
            const response3 = await fetch(`https://sametalk-back.herokuapp.com/api/users/self?token=${res2.token}`)
            const res3 = await response3.json()
            user.token = res2.token
            user.age = res3.age
            user.coins = res3.coins
            user.gender = res3.gender
            user.country_id = res3.country
            dispatch(userSetData(user))
            dispatch(getDataSuccess([]))
        } else {
            dispatch(userSetData(user))
            dispatch(getDataFailure())
        }
        
    }
}