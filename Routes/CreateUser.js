const express = require("express");
const router = express.Router();
const User = require("../models/User");
const app = express();
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const screteLine = "meran$aamshubham^haisamajhgayana";

router.post("/loginuser",
    [
        body("password").isLength({ min: 5 }),
        body("email").isEmail()
    ],

    async (req,res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ errors: "Invalid value" });
        }

        let  email = req.body.email;
        try {
            const userData = await User.findOne({email});

            if (!userData) {
                return res.json({errors : "User not found"});
            }

            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
            if (!pwdCompare) {
                return res.json({errors : "Enter correct password."});
            }

            const data = {
                user : {
                    id : userData._id
                }
            };
            const authToken = jwt.sign(data,screteLine);

            res.json({ success: true, authToken : authToken });
        }
        catch(error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/createuser",
    [
        body("name").isLength({ min: 5 }),
        body("password").isLength({ min: 5 }),
        body("email").isEmail()
    ]
    , async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(req.body.password,salt);
        try {
           
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: password,
                location: req.body.location
            });

            user.save();
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })




module.exports = router;