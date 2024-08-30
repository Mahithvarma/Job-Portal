import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Edit, Mail } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import store from '@/redux/store'


function Profile() {
    const [open , setOpen] = useState(false);
    const havResume = true;
    const {user} = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-5'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-medium">{user?.fullName}</h1>
                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}.</p>
                        </div>
                    </div>
                    <Button onClick={()=>setOpen(true)} variant="outline" className="text-right"><Edit /></Button>

                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-4 my-2'>
                        <Mail />
                        <p>{user?.email}</p>
                    </div>
                    <div className='flex items-center gap-4 my-2'>
                        <Contact />
                        <p>{user?.phoneNumber}</p>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-2 my-2'>
                        {
                            user?.profile?.skills.length > 0 ? user?.profile?.skills.map((skill, index) => (
                                <Badge key={index}>{skill}</Badge>
                            )) : <span>N/A</span>
                        }

                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-2'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        user?.profile?.resume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>N/A</span>
                    }
                </div>

            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='text-lg font-bold my-5'>Applied Jobs</h1>
                <AppliedJobTable />

            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile