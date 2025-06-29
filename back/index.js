const express= require('express')
const mongoose= require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRouter = require('./routes/authRoute.js')
const noteRouter = require('./routes/noteRoute.js')

dotenv.config()
const app=express()

const port=process.env.PORT || 3000

app.use(cors())
app.use(express.json())

//db connection
mongoose.connect(process.env.MONGODB)
.then(()=>{console.log('MongoDB connected 😸')})
.catch((err)=>{console.log(err)})


app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use('/api/auth',authRouter)
app.use('/api/note',noteRouter)


app.listen(port,()=>console.log(`Server started on port ${port}`))
