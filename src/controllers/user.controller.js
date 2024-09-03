import {asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { upload } from "../middlewares/multer.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
    // get user details from frontend
    // validation - if any field is by chance empty 
    // check if user already exists through email, username
    // check for images, check for avatar
    // upload them in cloudinary
    // check avatar is successfully uploaded on cloudinary
    // create user object - create entry in database
    // remove password and referesh token field from response
    // check for user creation
    // return response



    //Starting with the steps:



    // getting user details from frontend
    const {fullName, email, username, password} = req.body;
    console.log("email:", email);


    // validation - if any field is by chance empty 
    if(
        [fullName, email, username, password].some((field) => 
        field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required");
    }


    // check if user already exists through email, username
    const existingUser = User.findOne({
        $or: [{username}, {email}]
    })
    if(existingUser){
        throw new ApiError(409, "The username or email already exists");
    }


    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }


    // upload them in cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);


    // check avatar is successfully uploaded on cloudinary
    if(!avatar){
        throw new ApiError(400, "Failed to upload avatar on cloudinary");
    }


    // create user object - create entry in database
    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    })


    // remove password and referesh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


    // check for user creation
    if(!createdUser){
        throw new ApiError(500, "Failed to create user");
    }


    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully!")
    )




})


export {registerUser}