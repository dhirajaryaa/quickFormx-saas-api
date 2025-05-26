import mongoose from "mongoose";
import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import formModal from "../../models/form.model.js"

const getAllForms = AsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // mongodb aggregation with user left join
    const forms = await formModal.aggregate([
        { // 1. get all forms and remove draft forms
            $match: {
                userId: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        { // 2. left join user info
            $lookup: {
                from: "users",
                as: "userInfo",
                let: { "userId": "$userId" },
                pipeline: [
                    { // match user
                        $match: { $expr: { $eq: ["$_id", "$$userId"] } }
                    },
                    { // project some fields
                        $project: {
                            name: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        { // 3. unwind user info
            $unwind: "$userInfo"
        },
        { // 4. latest on top
            $sort: { createdAt: -1 }
        },
        { // 5. skip for pagination func.
            $skip: skip
        },
        { // 6. limit for pagination func.
            $limit: limit
        },
    ]);
    if (!forms) {
        throw new ApiError(404, "forms not found!")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "forms fetched successful!", forms));
});
export default getAllForms;
