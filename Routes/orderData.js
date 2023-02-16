const { Router } = require("express");
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart")
router.post("/orders", async function (req, res) {
    const data = req.body.order;

    await data.splice(0, 0, { order_date: req.body.order_date });

    const temp = await Cart.findOne({ email: req.body.email });
    if (temp === null) {
        try {
            const cart = new Cart({
                email: req.body.email,
                order: [data]
            })

            cart.save();
            res.json({ sucess: true });
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
    else {
        try {
            await Cart.findOneAndUpdate({ email: req.body.email },
                { $push: { order: data } }).then(() => { res.json({ success: true }) });
        }
        catch (error) {
            res.send(error);
        }
    }

})

router.post("/myorders", async function(req,res) {
    const temp = await Cart.findOne({email : req.body.email});
    
    if (temp !== null) {
    res.send(temp.order);
    }
    else {
        res.send([]);
    }
})

module.exports = router;