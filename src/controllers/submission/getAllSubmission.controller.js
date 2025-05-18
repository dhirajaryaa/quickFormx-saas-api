import AsyncHandler from "../../utils/asyncHandler.js";
import mongoose from "mongoose";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import submissionModal from "../../models/submission.model.js"

const getAllSubmissions = AsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!req.user) {
        throw new ApiError(400, "Unauthorized")
    };
    const submissions = await submissionModal.aggregate([
        { //1. attach form data like title for know what form data
            $lookup: {
                from: 'forms',
                as: 'formInfo',
                let: { formId: "$formId" },
                pipeline: [
                    { //  match form data
                        $match: { $expr: { $eq: ["$_id", "$$formId"] } }
                    }, {
                        $project: {
                            _id: 0,
                            title: 1
                        }
                    }
                ]
            }
        },
        { //2. unwind form form array
            $unwind: "$formInfo"
        },
        { //3. skip documents
            $skip:skip
        },
        { //4. length documents
            $limit:limit
        },
         { // 5. latest on top
            $sort: { createdAt: -1 }
        },
    ])
    return res.status(200).json(
        new ApiResponse(200, "fetched all submissions", submissions)
    )
});
export default getAllSubmissions;
