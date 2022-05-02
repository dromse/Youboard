const dotenv = require('dotenv')
dotenv.config({ path: '.dev.env' })

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const seq = require('./db')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandler')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errorHandler)

const start = () => {
    try {
        seq.authenticate()
        seq.sync()
        app.listen(PORT, () => console.log(`Server start at port: ${PORT}`))
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

start()
