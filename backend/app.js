const express = require('express');
const bodyParser = require('body-parser')
const sequelize = require('./config/db-connect')

const postRouter = require('./routes/post-route')
const userRouter = require('./routes/user-route')

const app = express();

const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use('/', postRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await sequelize.sync()
        app.listen(PORT, ()=> {
            console.log('Server starting...')
        })
    }catch (e) {
        console.log(e)
    }
}

start()

