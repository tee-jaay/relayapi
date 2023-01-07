import Crypto from "crypto";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const signUp = async (req, res) => {
    const {
        email,
        password,
        username,
    } = req.body;

    if (email == null || password == null || username == null) {
        return res.status(501).json({ message: "Email, Password, Username are required" });
    }

    // check user existence
    const user = await User.findOne({ email });
    if (user) {
        return res.status(200).json({ message: "Email already used" });
    }
    // check user existence

    const newCollection = new User({
        id: Crypto.randomUUID(),
        email,
        password: CryptoJS.AES.encrypt(
            password,
            process.env.JWT_SEC
        ).toString(),
        username,
    });
    try {
        const savedEntry = await newCollection.save();
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (email == null || password == null) {
        return res.status(501).json({ message: "Email, Password are required" });
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
                const accessToken = jwt.sign(
                    {
                        id: user.id,
                    },
                    process.env.JWT_SEC,
                    { expiresIn: "3d" }
                );

                const { email, ...others } = user._doc;

                return res.status(200).json({ ...others, accessToken });
            }
        }
    } catch (err) {
        return res.status(5000).json({ errorMsg: "Server error" });
    }
    // ====================
    // const {
    //     email,
    //     password
    // } = req.body;
    // const newCollection = new User({
    //     id: Crypto.randomUUID(),
    //     email,
    //     password,
    // });
    // try {
    //     const savedEntry = await newCollection.save();
    //     res.status(201).json(savedEntry);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
};

export const password_rest_request = async (req, res) => {
    const {
        email,
    } = req.body;
    if (email == null) {
        return res.res(400).json({ "message": "Email is required" });
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

