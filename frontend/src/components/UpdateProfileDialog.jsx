import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import axios from 'axios';
import { UserEndPoint } from '@/utils/APIRoutes';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills.map(skill=>skill) || "",
        file: user?.profile?.resume || ""
    })


    const changeEventhandler = (e)=>{
        setInput({ ...input, [e.target.name]: e.target.value})
    }

    const changeFileHandler = (e)=>{
        setInput({...input, file: e.target.files?.[0]});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if(input.file){
            formData.append("file", input.file);
        }

        try {
            setLoading(true);

            const res = await axios.put(`${UserEndPoint}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.res.data.message);
        } finally {
            setLoading(false);
        }

        setOpen(false);
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name">Full Name</Label>
                                <Input type="text" value={input.fullName} onChange={changeEventhandler} id="name" name="name" className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" value={input.email} onChange={changeEventhandler} id="email" name="email" className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input type="text" value={input.phoneNumber} onChange={changeEventhandler} id="phoneNumber" name="phoneNumber" className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio">Bio</Label>
                                <Input type="text" value={input.bio} onChange={changeEventhandler} id="bio" name="bio" className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills">Skills</Label>
                                <Input value={input.skills} onChange={changeEventhandler} id="skills" name="skills" className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file">Resume</Label>
                                <Input accept="application/pdf" onChange={changeFileHandler} type="file" id="file" name="file" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog