import mongoose from "mongoose";
import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import formModal from "../../models/form.model.js"

const getPublicForm = AsyncHandler(async (req, res) => {
    const { publicId } = req.params;
    console.log(publicId);

    if (!publicId) {
        throw new ApiError(400, "publicId missing or invalid!")
    };
    // get form 
    const form = await formModal.findOne({ publicId });

    if (!form) {
        throw new ApiError(404, "form not found!")
    };

    return res
        .status(200)
        .json(new ApiResponse(200, "form fetched successful!", form));
})
export default getPublicForm;
