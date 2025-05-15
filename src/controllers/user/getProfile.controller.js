import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import userModel from "../../models/user.model.js"

const getUserProfile = AsyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized")
    }
    const user = await userModel.findById(req.user?._id).select("-password -refreshToken -isVerified -googleId -verificationToken")
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "profile fetched successful!",user));
})
export default getUserProfile;
