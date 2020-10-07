const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require("method-override");
// INITIALIZATIONS
const app = express();

// CONFIGURATIONS
// eslint-disable-next-line no-undef
app.set("port", process.env.PORT || 3000);
// eslint-disable-next-line no-undef
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  expressHandlebars({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())
// GLOBAL VARS
app.use((req, res, next) => {
  res.locals.succes_msg = req.flash('succes_msg')
  next()
})
// ROUTES
app.use(require("./routes/index.routes"));
app.use(require("./routes/notes.routes"));
// STATIC FILES

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
