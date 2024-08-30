import Navbar from '@/components/shared/Navbar'
import { Input } from "../components/ui/input"
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

function AdminJobs() {
    const navigate = useNavigate();
    useGetAllAdminJobs();
    const { allAdminJobs } = useSelector(store => store.jobs);

    const [filterJob, setFilterJob] = React.useState("");
    const [filteredJobs, setFilteredJobs] = React.useState(allAdminJobs);


    useEffect(() => {
        setFilteredJobs(allAdminJobs.filter(job => job.title.toLowerCase().includes(filterJob.toLowerCase()) || job.company.name.toLowerCase().includes(filterJob.toLowerCase())));
    }, [filterJob, allAdminJobs]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input placeholder='Search Jobs' className="w-fit" onChange={(e) => setFilterJob(e.target.value)} />
                    <Button onClick={() => navigate("/admin/jobs/create")}>New Job</Button>
                </div>
                <AdminJobsTable jobs={filteredJobs} />
            </div>
        </div>
    )
}

export default AdminJobs