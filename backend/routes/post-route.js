const {Router} = require('express')
const Post = require('../models/post-model')

const router =Router();

router.get ('/', async (req, res) => {
    try {
        const allPosts =  await Post.findAll();
        res.json(allPosts)
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

router.post('/add', async (req, res) => {
    try{
        await Post.create({
            title: req.body.title,
            text: req.body.text
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

module.exports = router