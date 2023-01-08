import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        userName: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, },

    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;