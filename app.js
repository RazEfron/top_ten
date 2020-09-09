const express = require("express");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const storage = require("./utils/multer").storage;
storage;

const app = express();

// Certificate setup for https for devolepment
const key = fs.readFileSync("./config/certkey/privateKey.key");
const cert = fs.readFileSync("./config/certkey/certificate.crt");

//  Load env file
dotenv.config({ path: "./config.env" });

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
let Server;

if (process.env.NODE_ENV === "development") {
  Server = https.createServer({ key: key, cert: cert }, app);
} else {
  Server = app;
}

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
const languages = require("./routes/language");

app.use(passport.initialize());

// Auth Middleware
function Authenticate(req, res, next) {
  let { method, baseUrl } = req;
  ;
  if (method === "GET" || baseUrl === "/user") {
    next();
  } else {
    passport.authenticate("jwt", { session: false })(req, res, next);
  }
}

require("./config/passport")(passport);

app.use("/branch", Authenticate, branches);
app.use("/business", Authenticate, businesses);
app.use("/comment", Authenticate, comments);
app.use("/dish", Authenticate, dishes);
app.use("/list", Authenticate, lists);
app.use("/listVersion", Authenticate, listVersions);
app.use("/review", Authenticate, reviews);
app.use("/text", Authenticate, texts);
app.use("/user", Authenticate, users);
app.use("/language", Authenticate, languages);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World"));
Server.listen(port, () => console.log(`Server is running on port ${port}`));
