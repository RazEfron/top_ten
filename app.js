const express = require("express");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose")

const app = express();

// Certificate setup for https for devolepment
const key = fs.readFileSync("./config/certkey/privateKey.key");
const cert = fs.readFileSync("./config/certkey/certificate.crt");

//  Load env file
dotenv.config({path: './config.env'});

//  Load Database Connection
const db = require("./config/keys").MongoURI;

// Connect Port to mongo DB online
mongoose.connect(db, {
    useFindAndModify: false, 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB is connected'))
.catch(err => console.log(err))

//  Server Ports
let Server

if (process.env.NODE_ENV === 'development') {
    Server = https.createServer({key: key, cert: cert}, app);
} else {
    Server = app
}

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World"));

Server.listen(port, () => console.log(`Server is running on port ${port}`));