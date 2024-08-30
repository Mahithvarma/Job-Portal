import { Company } from "../models/companyModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

const RegisterCompany = async (req, res) => {
    try {
        const {name, description, website, location, logo} = req.body;
        if(!name){
            return res.status(400).json({
                message: "Company name is required.!",
                success: false
            });
        }

        const existingCompany = await Company.findOne({name: name});
        if(existingCompany){
            return res.status(400).json({
                message: "Company already exists with the same Name.!",
                success: false
            });
        }
        

        const company = await Company.create({
            name: name,
            description: description || "",
            website: website || "",
            location: location || "",
            logo: logo || "",
            userId: req.id
        });

        return res.status(201).json({
            message: "Company Registered Successfully.",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}


const getCompanies = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({userId: userId});
        if(!companies){
            return res.status(404).json({
                message: "Companies not found.!",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "Company not found.!",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};


const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const {name, description, website, location} = req.body;

        const file = req.file;

        let cloudResponse;
        if(file){ // setting Company Logo
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        let companyLogo;

        if(cloudResponse){
            companyLogo = cloudResponse.secure_url;
        }


        const updateData = { name, description, website, location, logo: companyLogo || "" };

        const company = await Company.findByIdAndUpdate(companyId, updateData, {new: true});
        if(!company){
            return res.status(404).json({
                message: "Company not found.!",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company Information Updated Successfully.!",
            success: true
        });


        // My own code

        // const companyId = req.params.id;
        // const {name, description, website, location} = req.body;

        // if(!companyId){
        //     return res.status(400).json({
        //         message: "Company Id is required.!",
        //         success: false
        //     });
        // }

        // let company = await Company.findById(companyId);
        // if(!company){
        //     return res.status(404).json({
        //         message: "Company not found.!",
        //         success: false
        //     });
        // }

        // if(name) company.name = name;
        // if(description) company.description = description;
        // if(website) company.website = website;
        // if(location) company.location = location;

        // await company.save();

        // company = {
        //     _id: company._id,
        //     name: company.name,
        //     description: company.description,
        //     website: company.website,
        //     location: company.location,
        // }

        // return res.status(200).json({
        //     message: "Company Information Updated Successfully.!",
        //     company,
        //     success: true
        // });
    } catch (error) {
        console.log(error);
    }
};

export { RegisterCompany, getCompanies, getCompanyById, updateCompany };