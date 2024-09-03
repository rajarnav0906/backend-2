import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; //this is mainly used to encrypt the password

const userSchema = new Schema(
    {
        username : {
            type: String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true // (mainly for optimization) if we want to make any field in mongoDB as searchable then we need to make it's index true 
        },
        email: {
            type: String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        }, 
        fullName: {
            type: String,
            required : true,
            trim : true,
            index : true
        },
        avatar : {
            type: String, //cloudnary url
            required : true
        },
        coverImage: {
            type: String, //cloudnary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required : [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)


//password encryption
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//to check if password is correct
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefereshToken = function(){
    return jwt.sign(
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);