import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function LatestJobCards({ job }) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/description/${job?._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='text-lg font-bold my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant="ghost" className="text-blue-700 font-bold">{job?.position} Positions</Badge>
                <Badge variant="ghost" className="text-[#f83002] font-bold">{job?.jobType}</Badge>
                <Badge variant="ghost" className="text-[#6a38c2] font-bold">{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
