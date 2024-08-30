import Navbar from '@/components/shared/Navbar'
import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import { ApplicationEndPoint } from '@/utils/APIRoutes';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${ApplicationEndPoint}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                {/* <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1> */}
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants