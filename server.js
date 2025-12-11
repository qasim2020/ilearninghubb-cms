const express = require("express")
const exphbs = require("express-handlebars")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const homeRoutes = require("./routes/homeRoutes")
const session = require('express-session');
const MongoStore = require("connect-mongo");

dotenv.config()
connectDB()

const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 60 * 60 * 24 * 7
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.engine("hbs", exphbs.engine({ extname: ".hbs", defaultLayout: "main" }))
app.set("view engine", "hbs")
app.set("views", "./views")

app.use(express.static("public"))

app.use(authRoutes);
app.use(homeRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})
