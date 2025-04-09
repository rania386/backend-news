var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const { connectToMongoDb } = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const logMiddleware = require('./middlewares/logsMiddlewares.js'); //log

const http = require("http"); //1
const fetch = require('node-fetch');
global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;

var indexRouter = require("./routes/indexRouter");
var usersRouter = require("./routes/usersRouter");
var osRouter = require("./routes/osRouter");
var formationRouter = require("./routes/formationRouter");
var articleRouter = require("./routes/articleRouter");
var GeminiRouter = require("./routes/GeminiRouter");
var quizRouter = require("./routes/quizRouter");
var alerteRouter = require ("./routes/alerteRouter");
var chapitreRouter = require ("./routes/chapitreRouter");
const pdfRouter = require("./routes/pdfRouter");
const inscritRouter = require("./routes/inscritRouter");
const certificatRouter = require("./routes/certificatRouter");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(logMiddleware)  //log

app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,Delete",
}))


app.use(session({   //cobfig session
  secret: "net secret pfe",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: {secure: false},
    maxAge: 24*60*60,
  
  },  
}))


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/os", osRouter);
app.use("/formation", formationRouter);
app.use("/articles", articleRouter);
app.use("/gemini", GeminiRouter);
app.use("/quizzes", quizRouter);
app.use("/alerte", alerteRouter);
app.use("/chapitre", chapitreRouter);
app.use("/pdfs", pdfRouter);
app.use("/inscrit", inscritRouter);
app.use("/certificat", certificatRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app); //2
server.listen(process.env.port, () => {
  connectToMongoDb()
  console.log("app is running on port 5000");
});