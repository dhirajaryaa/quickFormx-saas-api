import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import userModel from "../../models/user.model.js"
import { generateAccessAndRefreshToken } from "./login.controller.js"
import { cookiesOptions } from "../../config/env.js";

const loginWithGoogle = AsyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Authentication failed");
    };
    // extract user data
    const { id, _json: { name, picture, email, email_verified } } = req?.user;
    // check user email verify
    if (!email_verified) {
        throw new ApiError(401, "google email not verified or invalid user email!")
    }
    // check user exits
    let user = await userModel.findOne({
        $or: [{ googleId: id }, { email }]
    });
    if (!user) {
        // create user
        const generateUsername = `${email.split("@")[0]}_${Date.now()}`
        user = await userModel.create({
            googleId: id,
            name: name,
            avatar: { url: picture, publicId: "" },
            email: email,
            username: generateUsername
        });
    };
    // generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);
    // remove sensitive data
    const loginUser = await userModel.findById(user._id).select("-password -refreshToken -googleId")
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookiesOptions)
        .cookie("refreshToken", refreshToken, cookiesOptions)
        .json(new ApiResponse(200, "User login successful with google", { user: loginUser, accessToken, refreshToken }));
})
export default loginWithGoogle
