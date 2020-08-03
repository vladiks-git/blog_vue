const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const router = Router();

router.post('/registration', async (req,res) => {
    try{
            await User.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,8)
            })
            res.status(200)
            res.json({
                success: true
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
                where:{email: req.body.newEmail}
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

router.post('/login', async (req, res) => {
    try{
        console.log(req.body.email)
        const candidate = await User.findOne({
            where:{email: req.body.email}
        })
        if(candidate){
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
            if(passwordResult){
                const token = jwt.sign({
                    email: candidate.email,
                    id: candidate.id
                },'dev-jwt',{expiresIn: 3600})
                res.status(200).json({
                    token,
                    user: candidate,
                    auth: true
                })
            }else{
                res.status(401).json({
                    auth: false,
                    token: null
                })
            }
        }else{
            res.status(401).json({
                message: 'User not found',
                auth: false,
            })
        }
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

module.exports = router