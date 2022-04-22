import dotenv from 'dotenv'
dotenv.config({ path: '.dev.env' })
import express from 'express'

const PORT = process.env.PORT || 5000

var app = express()
app.use(express.json())

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server start at port: ${PORT}`))
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

start()
