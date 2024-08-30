import { Job } from "../models/jobModel.js";

const postJob = (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !(experience>=0) || !position) {
            return res.status(400).json({
                message: "All fields are required.!",
                success: false
            });
        }

        const job = Job.create({
            title: title,
            description: description,
            requirements: requirements,
            salary: salary,
            location: location,
            jobType: jobType,
            experience: experience,
            position: position,
            company: companyId,
            createdBy: userId
        });

        return res.status(201).json({
            message: "Job Posted Successfully.!",
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

// It is for students
const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: { $regex: keyword, $options: "i" }},
                {description: { $regex: keyword, $options: "i" }}
            ]
        }

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1});
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.!",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
        
    } catch (error) {
        console.log(error);
    }
};

// It is for students
const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "company",
            path: "applications",
        });
        if(!job){
            return res.status(404).json({
                message: "Job not found.!",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};


// It is for Admins
const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({createdBy: adminId}).populate({
            path: 'company',
            createdAt: -1
        });
        if(!jobs){
            return res.status(404).json({
                message: "Jobs not found.!",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};


export { postJob, getAllJobs, getJobById, getAdminJobs };