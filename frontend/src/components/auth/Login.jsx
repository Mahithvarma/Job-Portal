import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { UserEndPoint } from '../../utils/APIRoutes.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loading, user} = useSelector(store=>store.auth);
    
    const [input, setInput] = useState({
        email: "",
        password: ""
    });


    const changeEventHandler = (e)=>{
        setInput({...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const response = await axios.post(`${UserEndPoint}/login`, input, { withCredentials: true });

            if(response.data.success){
                dispatch(setUser(response.data.user));
                navigate("/");
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
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-5 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label >Email</Label>
                        <Input type='text' value={input.email} name="email" onChange={changeEventHandler} placeholder='Enter your Email' />
                    </div>
                    <div className='my-2'>
                        <Label >Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder='Enter the Password' />
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
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='flex justify-center'>Don't have an Account?  <Link to="/signup" className='text-blue-600 px-3'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login
