import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
    name: String,
    value: String
}, { _id: false });

const submissionSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Types.ObjectId,
        ref: "forms",
        required: [true, "Form Id is Required"]
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    fieldData: [fieldSchema],
    clientIp: String
}, {
    timestamps: true
});

const submissionModal = mongoose.model("Submission", submissionSchema);
export default submissionModal;
