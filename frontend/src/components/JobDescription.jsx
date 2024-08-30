import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import axios from 'axios';
import { ApplicationEndPoint, JobEndPoint } from '@/utils/APIRoutes';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function JobDescription() {
    const dispatch = useDispatch();

    const params = useParams();
    const jobId = params.id;
    const {singleJob} = useSelector(store => store.jobs);
    const {user} = useSelector(store => store.auth);

    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = React.useState(isInitiallyApplied);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const response = await axios.get(`${JobEndPoint}/get/${jobId}`, {withCredentials: true});
                if(response.data.success){
                    dispatch(setSingleJob(response.data.job));
                    setIsApplied(response.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const applyJobHandler = async () => {
        try {
            const response = await axios.get(`${ApplicationEndPoint}/apply/${jobId}`, {withCredentials: true});
            if(response.data.success){
                setIsApplied(true);
                const updatedJob = {...singleJob, applications: [...singleJob.applications, {applicant: user._id}]};
                dispatch(setSingleJob(updatedJob));
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
        }
    }


    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <Badge variant="ghost" className="text-blue-700 font-bold">{singleJob?.position} Positions</Badge>
                            <Badge variant="ghost" className="text-[#f83002] font-bold">{singleJob?.jobType}</Badge>
                            <Badge variant="ghost" className="text-[#6a38c2] font-bold">{singleJob?.salary}LPA</Badge>
                        </div>
                    </div>
                    <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed': 'bg-[#6a38c2] hover:bg-[#5b30a6]'}`}>{isApplied ? 'Already Applied': 'Apply Now'}</Button>
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.description}</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='lt-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    )
}

export default JobDescription