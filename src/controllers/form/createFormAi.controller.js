import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import formModal from "../../models/form.model.js"
import createFormSchema from "../../validators/form/createForm.js"
import ValidationError from "../../utils/validationError.js"
import aiAgent from "../../services/gemini.js"

const createFormWithAi = AsyncHandler(async (req, res) => {
    const { prompt } = req.body;
     // user login
    if (!req.user) {
        throw new ApiError(401, "Unauthorized")
    }
    // generate with ai and then transform
    const generatedForm = await aiAgent(prompt);
    const transformedData = generatedForm.text?.replace(/```json|```/g, "").trim();
    const formData = JSON.parse(transformedData);

    // form validate
    const validate = createFormSchema.safeParse(formData);
    if (!validate.success) {
        const errorMessage = ValidationError(validate.error);
        throw new ApiError(400, errorMessage)
    };

    // create form
    const createdForm = await formModal.create({ ...formData, userId: req.user._id });
    if (!createdForm) {
        throw new ApiError(500, "internal server error")
    };

    return res
        .status(201)
        .json(new ApiResponse(201, "form generated with AI successful!", createdForm));
})
export default createFormWithAi;
