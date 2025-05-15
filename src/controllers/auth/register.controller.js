import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import userModel from "../../models/user.model.js"
import registerSchema from "../../validators/auth/register.js"
import ValidationError from "../../utils/validationError.js";
import crypto from 'node:crypto'
import sendEmail from "../../utils/sendEmail.js";
import { URL } from '../../config/env.js'

const userRegister = AsyncHandler(async (req, res) => {
    const { name, email, username, password } = req.body;
    // check user input
    const validate = registerSchema.safeParse(req.body)
    if (!validate.success) {
        const errorMessage = ValidationError(validate.error);
        throw new ApiError(400, errorMessage)

    };
    // check user exist or not
    const userExits = await userModel.findOne({
        $or: [{ email }, { username }]
    });
    if (userExits?.username === username) {
        throw new ApiError(400, "username already taken")
    }
    if (userExits) {
    };
    // generate email token
    const token = crypto.randomBytes(32).toString('hex');
    //  create user
    const newUser = await userModel.create({
        name,
        email,
        password,
        username,
        verificationToken: token
    });
    // send verification email
    sendEmail({
        to: newUser.email,
        subject: "Verification Email from QucikFormx",
        username: newUser.name,
        link: `${URL}/verify-account?token=${token}`
    });
    // remove sensitive data
    const userDetails = await userModel.findById(newUser._id).select("-password -refreshToken -isVerified -googleId -verificationToken")

    return res
        .status(201)
        .json(new ApiResponse(201, "User Register successful!", userDetails));
})
export default userRegister;
