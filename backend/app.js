const express = require('express');
const sequelize = require('./config/db-connect')
const postRouter = require('./routes/post-route')

const app = express();

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use('/', postRouter)

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

