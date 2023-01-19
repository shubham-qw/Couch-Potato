const express = require("express");

const router = express.Router();


router.post("/fooddata", async (req, res) => {
    try {
        res.json([global.food_items, global.food_category]);
    }
    catch (error) {
        console.error(error);
        res.send("Mongodb error");
    }
})


module.exports = router;