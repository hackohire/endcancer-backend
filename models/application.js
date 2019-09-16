const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema(
    {
        name: String,
        description: String,
        appSecret: String,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            // required: true
        },
        uuid: String,
        apiKey: String,
        application_url: String,
        privacy_policy_url: String,
        status: {
            type: String,
            enum: ['Created', 'Submitted', 'Approved', 'Rejected', 'Archieved', 'Deleted', 'Published', 'Unpublished'],
            default: 'Created'
        }
    },
    {
        timestamps: true,
    },
);

module.exports = () => {
    try {
        return mongoose.model('application');
    } catch (e) {
        return mongoose.model('application', applicationSchema);
    }
};
