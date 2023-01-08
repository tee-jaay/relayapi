import Crypto from "crypto";
import CryptoJS from "crypto-js";
import User from "../models/User.model.js";
import generateAccessToken from "../services/generateAccessToken.js";

export const signUp = async (req, res) => {
    const {
        email,
        password,
        username,
    } = req.body;
    const uniqueId = Crypto.randomUUID();

    if (email == null || password == null || username == null) {
        return res.status(501).json({ message: "Email, Password, Username are required" });
    }
    try {
        // check user existence
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({ message: "Email already used" });
        }
        // check user existence

        const newCollection = new User({
            id: uniqueId,
            email,
            password: CryptoJS.AES.encrypt(
                password,
                process.env.JWT_SEC
            ).toString(),
            username,
        });
        // Save new user
        await newCollection.save();
        // Save new user

        // Generate new access token for authentication        
        const accessToken = generateAccessToken(uniqueId);
        // Create new user object to return  
        const obj = {
            id: uniqueId,
            email,
            accessToken,
        };
        res.status(201).json(obj);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (email == null || password == null) {
        res.status(501).json({ message: "Email, Password are required" });
    }
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json("Wrong credentials!");
        } else {
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.JWT_SEC
            );
            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            if (OriginalPassword !== password) {
                return res.status(401).json("Wrong credentials!");
            } else {
                // Generate access token
                const accessToken = generateAccessToken(user.id);
                // Remove unnecessary data
                if (user._doc.hasOwnProperty('password')) {
                    delete user._doc._id;
                    delete user._doc.password;
                    delete user._doc.__v;
                    delete user._doc.createdAt;
                    delete user._doc.updatedAt;
                }

                res.status(200).json({ ...user._doc, accessToken });
            }
        }
    } catch (err) {
        res.status(500).json({ errorMsg: "Server error" });
    }
};

export const password_rest_request = async (req, res) => {
    const {
        email,
    } = req.body;
    if (email == null) {
        res.res(400).json({ "message": "Email is required" });
    }
    const newCollection = new User({
        id: Crypto.randomUUID(),
        email,
    });
    try {
        const savedEntry = await newCollection.save();
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deactivate = async (req, res) => {
    try {
        const item = await User.deleteOne({ id: req.params.id });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json(error);
    }
};

