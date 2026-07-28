const express = require("express");
const router = express.Router();
const User = require("../models/User");


// POST API - Save User
router.post("/users", async (req, res) => {

    try {

        const user = new User(req.body);

        await user.save();


        res.status(201).json({

            message: "User saved successfully",

            data: user

        });


    } catch (error) {


        if (error.name === "ValidationError") {


            let errors = {};


            Object.keys(error.errors).forEach((field) => {


                errors[field] = error.errors[field].message;


            });


            return res.status(400).json({

                message: "Validation failed",

                errors: errors

            });


        }



        if (error.code === 11000) {


            let field = Object.keys(error.keyPattern)[0];


            return res.status(400).json({

                message: `${field} already exists`

            });


        }



        res.status(500).json({

            message: error.message

        });


    }

});




// GET API - Get All Users

router.get("/users", async (req, res) => {


    try {


        const users = await User.find();



        res.status(200).json(users);



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


});



module.exports = router;