const md5 = require('md5')
const fs = require('fs')
const path = require('path')

const createUser = (data) => {

    if(!data.email) throw new Error('Inconsistent data!')
    var jsonData = JSON.parse(fs.readFileSync(path.resolve('server/src/data/data.json')))

    if(jsonData.users[data.email]) throw new Error('User already exists!')

    var user = {
        id: md5(data.name + new Date()),
        token: '',
        name: data.name,
        email: data.email,
        password: data.password
      
    }

    jsonData.users[user.email] = user
    fs.writeFileSync(path.resolve('server/src/data')+ '/data.json', JSON.stringify(jsonData))
    return ' registered user! '

}

module.exports = {
    createUser
}