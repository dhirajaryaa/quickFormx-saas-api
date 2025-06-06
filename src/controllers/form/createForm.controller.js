import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import formModal from "../../models/form.model.js"
import createFormSchema from "../../validators/form/createForm.js"
import ValidationError from "../../utils/validationError.js"

const createNewForm = AsyncHandler(async (req, res) => {
    const { title, description, authUser, publicId, proForm, branding, isDraft, fields } = req.body;
    // user login
    if (!req.user) {
        throw new ApiError(401, "Unauthorized")
    }
    // input validate
    const validate = createFormSchema.safeParse(req.body);
    if (!validate.success) {
        const errorMessage = ValidationError(validate.error);
        throw new ApiError(400, errorMessage)
    };
    // check exited from
    const formExist = await formModal.findOne({ title: title, isDraft: false });
    if (formExist) {
        throw new ApiError(400, "Form already exists")
    };
    // create form
    const newForm = await formModal.create({
        title,
        description,
        authUser,
        publicId,
        proForm,
        branding,
        isDraft,
        fields,
        userId: req?.user._id
    });

    return res
        .status(201)
        .json(new ApiResponse(201, "form created successful!",newForm));
})
export default createNewForm;
