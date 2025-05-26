import mongoose, { Schema } from "mongoose";

const fieldSchema = new Schema({
    label: String,
    name: String,
    required: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        enum: ["text", "textarea", "email", "number", "radio", "checkbox", "select", "date", "file","password","url"],
        required: true
    },
    placeholder: { type: String },
    options: [{
        value: String,
        checked: {
            type: Boolean,
            default: false
        }
    }],  // for select , checkbox , radio button
}, { _id: false });

const formSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    authUser: {
        type: Boolean,
        default: false
    },
    publicUrl: {
        type: String,
        default: ""
    },
    proForm: {
        type: Boolean,
        default: false
    },
    branding: {
        type: String,
        default: "QuickFormX"
    },
    isDraft: {
        type: Boolean,
        default: true
    },
    fields: [fieldSchema],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

 const formModal = mongoose.model("Form", formSchema);
 export default formModal;
