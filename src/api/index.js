const URL = "https://sametalk-back.herokuapp.com/api/"

export const apiGetUser = async (token) => {
    console.log(URL + `users/self?token=${token}`)
    const response = await fetch(URL + `users/self?token=${token}`)
    const res = await response.json()
    return res
}