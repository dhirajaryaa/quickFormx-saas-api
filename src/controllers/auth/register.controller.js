import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import userModel from "../../models/user.model.js"

const userRegister = AsyncHandler(async (req, res) => {
    return res
        .status(201)
        .json(new ApiResponse(201, "User Register successful!", {}));
})
export default userRegister;
