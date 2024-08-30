import { setAppliedJobs } from '@/redux/jobSlice';
import { ApplicationEndPoint } from '@/utils/APIRoutes';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAppliedJobs() {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${ApplicationEndPoint}/getjobs`, {withCredentials: true});
                if(res.data.success){
                    dispatch(setAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppliedJobs();
    }, []);
}

export default useGetAppliedJobs