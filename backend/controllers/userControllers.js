import {User} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

const Register = async (req, res) => {
    try {
        const {fullName , email, password, phoneNumber, role} = req.body;
        if(!fullName || !email || !password || !phoneNumber || !role){
            return res.status(400).json({
                message: "All fields are required.!",
                success: false
            });
        };

        const file = req.file;

        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({
                message: `A ${existingUser.role} already exists with this Email.!`,
                success: false
            });
        }

        let cloudResponse;

        if(file){ // setting Profile Photo
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        let profilePhoto;

        if(cloudResponse){
            profilePhoto = cloudResponse.secure_url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            phoneNumber: phoneNumber,
            role: role,
            profile: {
                profilePhoto: profilePhoto || ""
            }
        });


        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
};

const Login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        
        if(!email || !password || !role){
            return res.status(400).json({
                message: "All fields are required.!",
                success: false
            });
        };

        let user = await User.findOne({email: email, role: role});
        if(!user){
            return res.status(400).json({
                message: `${role} not found with this Email.!`,
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect password.!",
                success: false
            });
        }

        if(user.role !== role){
            return res.status(400).json({
                message: "Account doesn't exist with this role.!",
                success: false
            });
        }

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});

        const cookieOptions = {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
        }

        return res.status(200).cookie("token", token, cookieOptions).json({
            message: `Welcome back ${user.fullName}.`,
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

const updateProfile = async (req, res) => {
    try {
        const {fullName, email, phoneNumber, bio, skills} = req.body;

        const file = req.file;
        

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",").map(skill => skill.trim());
        }

        const userId = req.id; // Comes from middleware Authentication

        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User not found.!",
                success: false
            });
        }

        if(fullName) user.fullName = fullName;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;

        if(file){ // setting resume
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            if(cloudResponse){
                user.profile.resume = cloudResponse.secure_url;
                user.profile.resumeOriginalName = file.originalname;
            }
        }

        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

export { Register, Login, Logout, updateProfile };