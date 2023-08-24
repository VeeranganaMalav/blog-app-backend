const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", blogRoutes);

mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log(err);
        });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})