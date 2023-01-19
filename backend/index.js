const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const createuser = require("./Routes/CreateUser");
const app = express();
const MongoDB = require("./db");
MongoDB();

app.use(cors());
app.use(express.json())
app.use("/api", createuser);
app.use("/api", require("./Routes/displayData"));
app.use("/api", require("./Routes/orderData"));

app.post("/createuser", function (req,res) {
    console.log(req.body);
})

app.get("/" , function(req,res) {
    res.send(global.food_category);
})

app.listen(5000, function () {
    console.log("Port running at local port 5000");
})

