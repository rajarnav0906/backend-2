import dotenv from "dotenv";
import mongoose from "mongoose";


import express from "express";
import connectDB from "./db/database.js";

// dotenv.config({
//     path: "./env"
// })

connectDB();


























/*there are ways to define and declare a function immediately through
the use of IIFE (i.e. Immediately invoked function expression ). this can be done
by ( () => {
    code here
} )()

by this way the function is defined and declared in the same line
*/



/*
;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MONGODB connection SUCCESSFUL!");

        app.on("error", (error) => {
            console.log("application not able to talk to express");
            throw error;
        })
        app.listen(`${process.env.PORT}`, () => {
            console.log("express server is listening on port " + process.env.PORT);
        })

    } catch (error) {
        console.error("MONGODB connection FAILED! " + error);
        process.exit(1);
    }
} )()

*/