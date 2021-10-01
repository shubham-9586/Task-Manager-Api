const mongoose=require('mongoose')
const express=require('express')
var cors = require('cors')
const app = express()

const CONNECTION_URL ="mongodb+srv://shubham:rHwluwr6c4HJIWyz@cluster0.2s7yg.mongodb.net/Project0?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose
.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));






app.use(cors())
app.use(express.json())
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))