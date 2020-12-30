const md5 = require('md5')
const fs = require('fs')
const path = require('path')

const getIn = (data) => {

    var jsonData = JSON.parse(fs.readFileSync(path.resolve('server/data/data.json')))
    if(!jsonData.users[data.email]) throw new Error('User not exists!')
    if(jsonData.users[data.email].password != data.password) throw new Error('Invalid password!')
    jsonData.users[data.email].token = md5(data.email + new Date())
  
    fs.writeFileSync(path.resolve('server/data')+ '/data.json', JSON.stringify(jsonData))

    delete jsonData.users[data.email].password
    return jsonData.users[data.email]
}


const tokenIsValid = (data) => {
    
    var jsonData = JSON.parse(fs.readFileSync(path.resolve('server/data/data.json')))
    if(!jsonData.users[data.email]) throw new Error('User not exists!')
    if(jsonData.users[data.email].token != data.token) throw new Error('Token not exists!')

    return true

}
//middleware
module.exports = {
    getIn,
    tokenIsValid
}
