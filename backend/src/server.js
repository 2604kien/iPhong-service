const express=require('express');
const app=express();
const cors=require('cors');
const path=require('path');
const connectDB=require('./config/dbConn');
const mongoose=require('mongoose');
const corsOptions=require('./config/corsOptions');
const PORT=3500;
require('dotenv').config()
connectDB();

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use('/', require('./routes/root'));
app.use('/publish', require('./routes/publishRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/request', require('./routes/requestRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/', express.static(path.join(__dirname, "public")));
mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>{
        console.log("Server is running at port "+PORT);
    })
})
module.exports=app;