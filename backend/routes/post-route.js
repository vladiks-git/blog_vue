const {Router} = require('express')
const Post = require('../models/post-model')

const router = Router();

router.get ('/', async (req, res) => {
    try {
        const allPosts =  await Post.findAll();
        allPosts.reverse()
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
        res.json({
            message: 'Post has been created'
        })
        res.status(200)
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const id = req.params.id
        await Post.destroy({
            where:{id}
        })
        res.status(200).json({
            message: 'Post has been deleted'
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

module.exports = router