const express = require('express');
const app = express();
const routes = require('./app/routes/index.server.routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://aegnor:sml64oWiBrlDp2TW@cluster0.xw1lzay.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser:true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("DB connected......")
});

app.use(routes);


app.listen(8081,()=>{
    console.log("Server is running on 8081....")
});