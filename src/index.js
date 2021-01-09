require('./models/User')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const authRouts = require('./routs/authRouts')
const requireAuth = require('./middlewares/requireAuth')
const app = express();

app.use(bodyParser.json())
app.use(authRouts)

const mongoUri = 'mongodb+srv://admin:admin@tracks-cluster.nbbzw.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', ()=>{
    console.log('connected to MongoDB!')
});
mongoose.connection.on('error', (err)=>{
    console.error('Error connecting to MongoDB:', err)
})

app.get('/', requireAuth, (req, res)=>{
    res.send(`You email: ${req.user.email}`);
});

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});