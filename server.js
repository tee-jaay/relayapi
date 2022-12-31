import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";

import app from './src/app.js';

// Env vars
dotenv.config();

const port = process.env.PORT || 3000;

// Env vars

// Database
const DB_CONN_URI = `mongodb+srv://mongorydusijujo:${process.env.MONGO_PASSWORD}@cluster0.p7jbyvl.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose
    .connect(DB_CONN_URI)
    .then(() => console.log("Database connection successful"))
    .catch((err) => console.error(err));
// Database

// Initialize app
const server = createServer(app);
// Initialize app

server.listen(port, () => {
    console.log(`The app listening on port ${port}`);
});