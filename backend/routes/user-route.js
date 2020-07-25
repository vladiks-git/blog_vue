const {Router} = require('express')
const User = require('../models/user-model')

const router = Router();

router.post('/registration', async (req,res) => {
    try{
            await User.create({
                email: req.body.email,
                password: req.body.password
            })
            res.status(200)
            res.json({
                success: true
            })
        res.json({
            message: 'User has been registered'
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

router.post('/uniqEmail', async (req, res) => {
    try{
       const userIbDb =  await User.findOne({
            where: {
                email: req.body.newEmail
            }
        })
        if(!userIbDb){
            res.json({uniq:true})
        }
        if(userIbDb){
            res.json({uniq:false})
        }
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

module.exports = router