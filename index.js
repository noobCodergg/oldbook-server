const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const cookieParser = require("cookie-parser");
const path = require('path')
const registrationRoute = require('./Routes/userRoutes')
const bookRoute = require('./Routes/bookRoutes')
const feedRoute = require('./Routes/postRoutes')

require("dotenv").config();

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://jolly-cactus-e9bdc0.netlify.app", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true, 
  })
);

app.use('/api/registration',registrationRoute)
app.use('/api/book',bookRoute)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/feed',feedRoute)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));