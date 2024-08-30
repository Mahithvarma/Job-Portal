import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import store from '@/redux/store';


function LatestJobs() {

  const {allJobs} = useSelector(store => store.jobs);

  return (
    <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold'><span className='text-[#6a38c2]'>Latest & Top</span> Job Openings</h1>

        <div className='grid grid-cols-3 gap-4 my-5'>
            {
                allJobs.length > 0 ? allJobs?.slice(0, 6).map((job, index)=> <LatestJobCards key={job._id} job={job} />) : <span>No Jobs Available.!</span>
            }
        </div>
    </div>
  )
}

export default LatestJobs
