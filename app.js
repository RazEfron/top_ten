const express = require("express");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

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

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// Routes
const branches = require("./routes/api/branches");
const businesses = require("./routes/api/businesses");
const comments = require("./routes/api/comments");
const dishes = require("./routes/api/dishes");
const lists = require("./routes/api/lists");
const listVersions = require("./routes/api/listVersions");
const reviews = require("./routes/api/reviews");
const texts = require("./routes/api/texts");
const google = require("./routes/api/google")

app.use("/api/branches", branches);
app.use("/api/businesses", businesses);
app.use("/api/comments", comments);
app.use("/api/dishes", dishes);
app.use("/api/lists", lists);
app.use("/api/listVersions", listVersions);
app.use("/api/reviews", reviews);
app.use("/api/texts", texts);
app.use("/api/google", google);



const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World"));

Server.listen(port, () => console.log(`Server is running on port ${port}`));