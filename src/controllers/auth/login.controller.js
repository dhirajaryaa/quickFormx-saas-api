import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import userModel from "../../models/user.model.js"
import loginSchema from "../../validators/auth/login.js"
import ValidationError from "../../utils/validationError.js";
import { cookiesOptions } from "../../config/env.js"

export const generateAccessAndRefreshToken = async (user) => {
    if (!user) null;
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    if (!(accessToken && refreshToken)) {
        throw new ApiError(500, "internal server error")
    }
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken }
}

const userLogin = AsyncHandler(async (req, res) => {
    const { identifier, password } = req.body;
    // check user input
    const validate = loginSchema.safeParse(req.body)
    if (!validate.success) {
        const errorMessage = ValidationError(validate.error);
        throw new ApiError(400, errorMessage)
    };
    // check user exist or not
    const user = await userModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
        isVerified: true
    });
    if (!user) {
        throw new ApiError(400, "user not found!")
    };
    // check password
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "password invalid or incorrect")
    };
    // generate token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);
    // remove sensitive data
    const loginUser = await userModel.findById(user._id).select("-password -refreshToken -isVerified -googleId -verificationToken")
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookiesOptions)
        .cookie("refreshToken", refreshToken, cookiesOptions)
        .json(new ApiResponse(200, "User login successful!", { user: loginUser, accessToken, refreshToken }));
})
export default userLogin;
