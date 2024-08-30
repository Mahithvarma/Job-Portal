import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function Job({job}) {
    const navigate = useNavigate();

    const daysAgo = (date) => {
        const today = new Date();
        const postedDate = new Date(date);
        const diff = today - postedDate;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
    
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 '>
            <div className='flex items-center justify-between'>
                <h1 className='text-sm text-gray-600'>{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago` }</h1>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='text-lg font-medium'>{job?.company.name}</h1>
                    <p className='text-sm text-gray-600'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant="ghost" className="text-blue-700 font-bold">{job?.position} Positions</Badge>
                <Badge variant="ghost" className="text-[#f83002] font-bold">{job?.jobType}</Badge>
                <Badge variant="ghost" className="text-[#6a38c2] font-bold">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline" onClick={()=> navigate(`/description/${job?._id}`)} >Details</Button>
                <Button className="bg-[#6a38c2]">Save for Later</Button>

            </div>
        </div>
    )
}

export default Job