import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import formModal from "../../models/form.model.js"

const deleteForm = AsyncHandler(async (req, res) => {
    const { formId } = req.params;
    if (!formId) {
        throw new ApiError(400, "formId missing or invalid!")
    };
    await formModal.findByIdAndDelete(formId);
    return res
        .status(200)
        .json(new ApiResponse(200, "form delete successful!"));
})
export default deleteForm;
