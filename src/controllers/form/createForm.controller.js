import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import formModal from "../../models/form.model.js"

const createNewForm = AsyncHandler(async (req, res) => {
    const {title} = req.body;
    return res
        .status(201)
        .json(new ApiResponse(201, "form created successful!",));
})
export default createNewForm;
