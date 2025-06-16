const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const express = require('express'),
    app = express(),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    router = require('../routes/index');
    path = require('path')


app.use(cors({
    origin:'*'
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
   limit: '50mb',
   extended: true,
   parameterLimit: 50000
}));
app.use(cookieParser());

app.use(session({
    secret: 'R5bj7ymny5T7nHhCfjRSrHYlbouP2pz4', 
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: false } 
}));

// Initialize Passport and Passport Session
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use((req,res,next)=>{
    if(!["POST","GET","DELETE","PUT","PATCH","OPTIONS"].includes(req.method)) res.status(403).json({"message":"Mehtod Not allowed"});
        next();
});


app.use('/api/v1',router)
module.exports=app;