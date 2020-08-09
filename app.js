const express = require("express");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const passport = require("passport");

const storage = require('./utils/multer').storage;
storage

const app = express();

// Certificate setup for https for devolepment
const key = fs.readFileSync("./config/certkey/privateKey.key");
const cert = fs.readFileSync("./config/certkey/certificate.crt");

//  Load env file
dotenv.config({path: './config.env'});

//  Load Database Connection
const db = require("./config/keys").MongoURI;

// Connect Port to mongo DB online
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

//  Server Ports
let Server

if (process.env.NODE_ENV === 'development') {
    Server = https.createServer({key: key, cert: cert}, app);
} else {
    Server = app
}

// Body Parser
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Routes
const branches = require("./routes/branch");
const businesses = require("./routes/business");
const comments = require("./routes/comment");
const dishes = require("./routes/dish");
const lists = require("./routes/list");
const listVersions = require("./routes/listVersion");
const reviews = require("./routes/review");
const texts = require("./routes/textString");
const users = require("./routes/user");

app.use(passport.initialize());
app.use(express.static('./public'));

require("./config/passport")(passport);

app.use("/branch", branches);
app.use("/business", businesses);
app.use("/comment", comments);
app.use("/dish", dishes);
app.use("/list", lists);
app.use("/listVersion", listVersions);
app.use("/review", reviews);
app.use("/text", texts);
app.use("/user", users);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World"));
Server.listen(port, () => console.log(`Server is running on port ${port}`))