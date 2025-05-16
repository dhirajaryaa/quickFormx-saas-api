import mongoose from "mongoose";
import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import formModal from "../../models/form.model.js"

const getForm = AsyncHandler(async (req, res) => {
    const { formId } = req.params;
    if (!formId) {
        throw new ApiError(400, "formId missing or invalid!")
    };
    // get form and add user data [left join]
    const form = await formModal.aggregate([
        {
            // 1. Match using id and exclude drafts
            $match: {
                _id: new mongoose.Types.ObjectId(formId),
                isDraft: false
            }
        },
        {
            // 2. Lookup user profile and project selected fields
            $lookup: {
                from: "users",
                as: "userInfo",
                let: { userId: "$userId" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", "$$userId"]
                            }
                        }
                    },
                    {
                        $project: {
                            name: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            // 3. Unwind the userInfo array
            $unwind: "$userInfo"
        }
    ]);
    if (!form) {
        throw new ApiError(404, "form not found!")
    };

    return res
        .status(200)
        .json(new ApiResponse(200, "form fetched successful!", form));
})
export default getForm;
