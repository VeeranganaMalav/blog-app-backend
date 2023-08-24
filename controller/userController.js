const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../model/user");

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET_KEY;
const tokenExpiration = process.env.TOKEN_EXPIRATION;

exports.register = async (req, res) => {
    try{
        const { username, avatar, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            username,
            avatar,
            email,
            password: hashedPassword
        });

        if(!createdUser){
            res.status(400).send("Error creating user");
            return;
        }

        res.status(201).send({ message: "User created successfully", user: createdUser })
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(!existingUser){
            res.status(400).send("User not found");
            return;
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if(!passwordMatch){
            res.status(400).send("Enter correct credentials");
        }
        else{
            let token = jwt.sign({ user: existingUser }, jwtSecret, { expiresIn: tokenExpiration });

            res.status(200).send({ message: "User logged in successfully", token: token, user: existingUser });
        }

    }
    catch(err){
        res.status(500).send(err);
    }
}