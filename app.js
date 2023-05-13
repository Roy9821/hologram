// import Express from "express";
const Express = require("express");
// import AuthRoutes from "./routes/AuthRoutes.js";
// import PostRoutes from "./routes/PostRoutes.js";
// import UserRoutes from "./routes/UserRoutes.js";
// import ChatRoutes from "./routes/ChatRoutes.js";
// import NotificationRoutes from "./routes/NotificationRoutes.js";
// import mongoose from "mongoose";
const mongoose = require("mongoose")
// import cookieParser from "cookie-parser";
// import path from "path"
const path = require('path');

// import dotenv from "dotenv"
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });
const app = Express();
app.use(Express.json());
// app.use(cookieParser());


const connect = async () => {
    await mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true });
    console.log("connected to database");
}

// app.use('/api/auth', AuthRoutes);
// app.use('/api/post', PostRoutes);
// app.use('/api/user', UserRoutes);
// app.use('/api/chat', ChatRoutes);
// app.use('/api/notification', NotificationRoutes);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

// if (process.env.NODE_ENV === "production") {
    // const path = require("path");
    app.use(Express.static(path.resolve(__dirname, 'client', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'), function (err) {
            if (err) {
                res.status(500).send(err)
            }
        });
    })
// }

const PORT = process.env.PORT || 8808
app.listen(PORT, () => {
    connect();
    console.log(`connected of ${PORT}`);
})