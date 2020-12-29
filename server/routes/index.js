const { Router } = require('express')
const router = Router()
const login = require('../app/login')



router.put('/login', (req, res) =>{
    try {
       res.send( login.getIn(req.body))
    } catch (error) {
        res.status(401).send({error:error.message})
    }
})


module.exports = router