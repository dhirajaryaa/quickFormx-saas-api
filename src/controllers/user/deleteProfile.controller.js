import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import userModel from "../../models/user.model.js"

const deleteUserAccount = AsyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized")
    }
    await userModel.findByIdAndDelete(req?.user._id);
    return res
        .status(200)
        .json(new ApiResponse(200, "user account deleted"));
})
export default deleteUserAccount;
