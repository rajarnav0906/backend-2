import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();



/*

MIDDLEWARE ->

    middleware is something which is executed between the request and the response.
    when we write app.use() we are basically using a middleware.
    a middleware is something which is executed between the request and the response
    from the server, for example when a user request for the /instagram route from the server 
    then we have to check if the user is logged in and then redirect to the instagram and give the
    respond, this checking is basically a middleware.

*/



//cors stands for cross origin and it is used to allow the server side to give access to different ports for the request to come to the server 
app.use(cors({         
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//this is to directly accept the json data. this is basically used to cofigure the request. JAB FORM SE DATA AAYE !!
app.use(express.json({
    limit: "16kb"
}))

//this is used to encode the url. JAB URL SE DATA AAYE !!
app.use(urlencoded({
    extended: true,
    limit: "16kb"
}))

//sometimes there are some files which are to be stored in our computer, so we use public file to store those. for eg when user is uploading file and suddenly network is gone so in that case we have to store in our computer.
app.use(express.static("public"))

//cookieParser is used by the server to store some or a little data in the client side computer for some need
app.use(cookieParser())

export { app }



