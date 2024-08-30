import { setAllAdminJobs } from '@/redux/jobSlice';
import { JobEndPoint } from '@/utils/APIRoutes';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllAdminJobs() {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JobEndPoint}/getadminjobs`, {withCredentials: true});
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllAdminJobs();
    }, []);
}

export default useGetAllAdminJobs