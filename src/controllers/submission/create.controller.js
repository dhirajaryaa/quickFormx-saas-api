import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import ValidationError from "../../utils/validationError.js";
import formModal from "../../models/form.model.js"
import submissionModal from "../../models/submission.model.js"
import submissionSchema from "../../validators/submission/submission.js"

const saveNewSubmission = AsyncHandler(async (req, res) => {
    const { data, formId, userId } = req.body;
    // form validate
    const validate = submissionSchema.safeParse(req.body);
    if (!validate.success) {
        const errorMessage = ValidationError(validate.error);
        throw new ApiError(400, errorMessage)
    };
    // find form for match data
    const form = await formModal.findById(formId);
    if (!form) {
        throw new ApiError(404, "form not found!")
    };
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // check form fields match
    const check = data.every(field => {
        return form?.fields.some(formField => formField.name === field.name)
    });
    if (!check) {
        throw new ApiError(400, "form fields does not match")
    }
    // save submission
    const newSubmission = await submissionModal.create({
        formId,
        userId: userId || null,
        fieldData: data,
        clientIp: ip
    })

    return res.status(201).json(
        new ApiResponse(201, "submission saved ❤️ ",newSubmission)
    )

})
export default saveNewSubmission;
