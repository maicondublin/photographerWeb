import axios from 'axios'
import config from '../config'

export default (newUser) => {
    return axios({
        method: 'put',
        url: `${config.baseURL}/newUser`,
        data: newUser
    }).then(response => {
        return response
    }).catch(err => {
        console.log(err)
        return new Error(err.response.data.error)

    })
}