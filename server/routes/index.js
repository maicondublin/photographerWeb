const { Router } = require('express')
const router = Router()
const login = require('../app/login')
const user = require('../app/user')


router.put('/login', (req, res) =>{
    try {
       res.send( login.getIn(req.body))
    } catch (error) {
        res.status(401).send({error:error.message})
    }
})

router.put('/newUser', (req, res) =>{
    try {
        res.send({data: user.createUser(req.body)}) 
    } catch (error) {
        res.status(500).send({error:error.message})
    }
})

module.exports = router