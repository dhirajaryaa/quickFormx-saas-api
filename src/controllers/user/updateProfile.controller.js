import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import userModel from "../../models/user.model.js";
import updateSchema from "../../validators/user/update.js"

const updateUserProfile = AsyncHandler(async (req, res) => {
    const { name, username, age, address, tagline, links } = req.body;
    // check user input
    const validate = updateSchema.safeParse(req.body)
    if (!validate.success) {
        const errorMessage = ValidationError(validate.error);
        throw new ApiError(400, errorMessage)
    };
    // check login user
    const user = await userModel.findById(req?.user._id);
    if (!user) {
        throw new ApiError(401, "Unauthorized")
    };
    const updatedUser = await userModel.findByIdAndUpdate(
        req?.user._id,
        {
            name: name || user?.name,
            username: username || user?.username,
            age: age || user?.age,
            address: address || user?.address,
            tagline: tagline || user?.tagline,
            links: links || user?.links
        },
        {
            new: true,
            select: "-password -refreshToken -verificationToken -isVerified -googleId"
        }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, "profile update successful!", updatedUser));
})
export default updateUserProfile;
