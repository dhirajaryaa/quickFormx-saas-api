import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import userModel from "../../models/user.model.js"
import { cookiesOptions } from "../../config/env.js"
import { generateAccessAndRefreshToken } from './login.controller.js'

const refreshAccessToken = AsyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(400, 'unauthorized or invalid action');
    }
    const user = await userModel.findById(req?.user._id);
    // generate token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookiesOptions)
        .cookie("refreshToken", refreshToken, cookiesOptions)
        .json(new ApiResponse(200, "AccessToken refresh successful!", { accessToken, refreshToken }));
});
export default refreshAccessToken;
