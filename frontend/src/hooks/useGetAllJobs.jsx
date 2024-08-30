import { setAllJobs } from '@/redux/jobSlice';
import store from '@/redux/store';
import { JobEndPoint } from '@/utils/APIRoutes';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function useGetAllJobs(isSearch) {

    const dispatch = useDispatch();
    const {searchQuery} = useSelector(store => store.jobs);
    const searchKeyWord = isSearch ? searchQuery : "";
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JobEndPoint}/getall?keyword=${searchKeyWord}`, {withCredentials: true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllJobs();
    }, []);
}

export default useGetAllJobs