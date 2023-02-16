const express = require('express');
const cors = require("cors");
const createuser = require("./Routes/CreateUser");
const app = express();
const MongoDB = require("./db");
const PORT = process.env.PORT || 5000;
MongoDB();

app.use(cors());
app.use(express.json())
app.use("/api", createuser);
app.use("/api", require("./Routes/displayData"));
app.use("/api", require("./Routes/orderData"));


app.get("/" , function(req,res) {
    res.send(global.food_category);
})

app.listen(PORT, function () {
    console.log("Port running at local port " + PORT);
})

