import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserEndPoint } from '../../utils/APIRoutes.js';
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loading, user} = useSelector(store=>store.auth);

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "",
        file: ""
    });

    const changeEventHandler = (e)=>{
        setInput({...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e)=>{
        setInput({...input, file: e.target.files?.[0]});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if(input.file){
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));

            const response = await axios.post(`${UserEndPoint}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if(response.data.success){
                navigate("/login");
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            if(error.response){
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Something went wrong.!");
            }
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-5'>
                    <h1 className='font-bold text-xl mb-5'>Sign up</h1>
                    <div className='my-2'>
                        <Label >Full Name</Label>
                        <Input type="text" value={input.fullName} name="fullName" onChange={changeEventHandler} placeholder='Enter your full name' />
                    </div>
                    <div className='my-2'>
                        <Label >Email</Label>
                        <Input type='text' value={input.email} name="email" onChange={changeEventHandler} placeholder='Enter your Email' />
                    </div>
                    <div className='my-2'>
                        <Label >Phone Number</Label>
                        <Input type='text' value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder='Enter your Mobile number' />
                    </div>
                    <div className='my-2'>
                        <Label >Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder='Enter the Password' />
                    </div>
                    <div className='my-2'>
                        <Label >Confirm Password</Label>
                        <Input type='password' value={input.confirmPassword} name="confirmPassword" onChange={changeEventHandler} placeholder='Re Enter the Password' />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} id="r1" className="cursor-pointer"/>
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} id="r2" className="cursor-pointer"/>
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Label>Profile</Label>
                        <Input accept="image/*" type='file' onChange={changeFileHandler} className="cursor-pointer"/>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button> : <Button type="submit" className="w-full my-4">Sign up</Button>
                    }
                    <span className='flex justify-center'>Already have an Account?  <Link to="/login" className='text-blue-600 px-3'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup
