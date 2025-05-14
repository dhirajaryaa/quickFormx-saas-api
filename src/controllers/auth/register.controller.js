import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import userModel from "../../models/user.model.js"
import registerSchema from "../../validators/auth/register.js"
import ValidationError from "../../utils/validationError.js";

const userRegister = AsyncHandler(async (req, res) => {
    const { name, email, username, password } = req.body;
    // check user input
    const validate = registerSchema.safeParse(req.body)
    if (!validate.success) {
        const errorMessage = ValidationError(validate.error);
        throw new ApiError(400, errorMessage)

    };
    // check user exist or not
    const userExits = await userModel.findOne({
        $or: [{ email }, { username }]
    });
    if (userExits) {
        throw new ApiError(404, "user already exists")
    };
    const newUser = await userModel.create({
        name,
        email,
        password,
        username
    });
    const userDetails = await userModel.findById(newUser._id).select("-password")

    return res
        .status(201)
        .json(new ApiResponse(201, "User Register successful!", userDetails));
})
export default userRegister;
