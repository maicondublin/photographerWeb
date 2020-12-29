import axios from 'axios'
import config from '../config'

export default (access) => {
    return axios({
        method: 'put',
        url: `${config.baseURL}/login`,
        data: {email:access.email, password:access.password}
    }).then(response => {
        return response
    }).catch(err => {
        console.log(err)
        return new Error(err.response.data.error)

    })
}