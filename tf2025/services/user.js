import axios from "axios"

export const getInfo = async () => {
    const user =  await axios.get(process.env.SERVER_URL + "/info", {withCredentials: true})
        .then(res => {
            return res.data.user
        })
        .catch(err => {
            alert(err)
            return null
        })
    return user
}

module.exports = {getInfo}