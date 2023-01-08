import jwt from "jsonwebtoken";

export default function (userId) {
    if (userId == null) {
        return;
    }
    return jwt.sign(
        {
            id: userId,
        },
        process.env.JWT_SEC,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
    );
}