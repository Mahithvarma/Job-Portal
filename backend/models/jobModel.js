import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: { // Relation to the company that posted the job
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    createdBy: { // Relation to the user who created the job
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    applications: [ // Relation to the applications for this job
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application"
        }
    ]

}, { timestamps: true });

export const Job =  mongoose.model("Job", jobSchema);