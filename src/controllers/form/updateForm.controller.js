import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import formModal from "../../models/form.model.js"
import updateFormSchema from "../../validators/form/updateForm.js"
import ValidationError from "../../utils/validationError.js"

const updateForm = AsyncHandler(async (req, res) => {
    const { title, description, authUser, publicUrl, proForm, branding, isDraft, fields } = req.body;
    const { formId } = req.params;
    // user login
    if (!req.user) {
        throw new ApiError(401, "Unauthorized")
    }
    // input validate
    const validate = updateFormSchema.safeParse(req.body);
    if (!validate.success) {
        const errorMessage = ValidationError(validate.error);
        throw new ApiError(400, errorMessage)
    };
    // check exited from
    const form = await formModal.findById(formId);
    if (!form) {
        throw new ApiError(404, "Form not found!")
    };
    // update form
    const updatedForm = await formModal.findByIdAndUpdate(formId, {
        title: title || form.title,
        description: description || form.description,
        authUser: authUser || form.authUser,
        publicUrl: publicUrl || form.publicUrl,
        proForm: proForm || form.proForm,
        branding: branding || form.branding,
        isDraft: isDraft || form.isDraft,
        fields: fields || form.fields,
    }, { new: true });

    return res
        .status(200)
        .json(new ApiResponse(200, "form update successful!", updatedForm));
})
export default updateForm;
