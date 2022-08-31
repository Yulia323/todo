import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import cors from 'cors'

const PORT = 5000;
const DB_URL = `mongodb+srv://user:user@cluster0.l4qfi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const app = express()

app.use(cors());
app.use(express.json())

app.use('/api', router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        app.listen(PORT, () => console.log('Работает'))
    } catch (e) {
        console.log(e)
    }
}

startApp()
