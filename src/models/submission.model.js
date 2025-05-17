import mongoose from "mongoose";



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
    fieldData: [{
        name: String,
        value: String
    }],
    geoLocation: {
        type: String,
        default: null
    },
    device: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const submissionModal = mongoose.model("Submission", submissionSchema);
export default submissionModal;
