const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

require('dotenv').config();
if(process.env.ENVIRONMENT !== "testing"){
    require('./utils/db').connect();
}

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/views/'));

/////////AUTHORIZATION///////////
app.use((req, res, next)=>{
    let authHeader = req.headers.authorization?.split(' ');
    if(req.headers?.authorization && authHeader[0] ==='Bearer'){
        jwt.verify(authHeader[1], process.env.JWT_SECRET, (err, decoded)=>{
            if(err) req.user = undefined;
            req.user = decoded;
            next();
        });
    }else{
        req.user = undefined;
        next();
    }
});
/////////////////////////////////

app.use('/api/users', require('./routes/users'));
app.use('/api/parts', require('./routes/parts'));
app.use('/api/locations', require('./routes/locations'));

module.exports = app;