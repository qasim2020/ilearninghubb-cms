const express = require("express")
const exphbs = require("express-handlebars")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")

dotenv.config()
connectDB()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.engine("hbs", exphbs.engine({ extname: ".hbs", defaultLayout: "main" }))
app.set("view engine", "hbs")
app.set("views", "./views")

app.use(express.static("public"))

app.use(authRoutes);

app.get("/", (req, res) => {
  res.render("home")
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})
