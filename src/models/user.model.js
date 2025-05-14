import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { Access_Token_Secret, Access_Token_Expired, Refresh_Token_Expired, Refresh_Token_Secret } from "../config/env.js"

// social link schema
const linkSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    { _id: false }
)

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is Required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is Required'],
            trim: true,
            lowercase: true,
            unique: true
        },
        username: {
            type: String,
            required: [true, 'Username is Required'],
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is Required']
        },
        forms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Form'
            }
        ],
        isPublic: {
            type: Boolean,
            default: false
        },
        age: Number,
        address: String,
        links: [linkSchema],
        tagline: String,
        refreshToken: String,
        avatar: {
            url: {
                type: String,
                default: ''
            },
            publicId: {
                type: String,
                default: ''
            }
        }
    },
    { timestamps: true }
)
// password hash middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12,)
    next()
})
// password match middleware
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
// access Token generate middleware
userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name
    }, Access_Token_Secret, {
        expiresIn: Access_Token_Expired
    })
}
// refresh Token generate middleware
userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign({
        _id: this._id
    }, Refresh_Token_Secret, {
        expiresIn: Refresh_Token_Expired
    })
}

const userModel = mongoose.model('User', userSchema)
export default userModel
