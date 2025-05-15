import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import userModel from "../../models/user.model.js";

const verifyAccount = AsyncHandler(async (req, res) => {
    const { token: incomingToken } = req.query;
    if (!incomingToken) {
        throw new ApiError(404, "token not found or invalid token!")
    };
    // check token
    const user = await userModel.findOne({
        verificationToken: incomingToken
    });
    // check token under valid time use
    const updatedAtTime = new Date(user?.updatedAt).getTime();
    const expiryLimit = updatedAtTime + 15 * 60 * 1000; // 15 minutes after updatedAt
    if (!user || Date.now() > expiryLimit) {
        throw new ApiError(400, "Token is invalid or has expired")
    }
    // update user set verified
    const updateUser = await userModel.findByIdAndUpdate(user._id, {
        isVerified: true,
        verificationToken: null
    }, {
        new: true,
        select: "-password -refreshToken -verificationToken -isVerified -googleId"
    });
    return res
        .status(201)
        .json(new ApiResponse(201, "User account verification successful!", updateUser));
})
export default verifyAccount;
