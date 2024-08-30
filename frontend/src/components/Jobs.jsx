import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from "framer-motion"


function Jobs() {
    useGetAllJobs(false);
    // const dispatch = useDispatch();

    // useEffect(()=>{
    //     dispatch(setSearchQuery(""));
    // }, []);


    const { allJobs } = useSelector(store => store.jobs);

    const [searchOption, setSearchOption] = useState("");
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchOption) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchOption.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchOption.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchOption.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchOption]);



    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard setSearchOption={setSearchOption} />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Jobs not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs?.map((job, index) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job._id}
                                            >

                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs