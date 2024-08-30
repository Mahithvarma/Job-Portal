import { setCompanies } from '@/redux/CompanySlice';
import { CompanyEndPoint } from '@/utils/APIRoutes';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllCompanies() {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${CompanyEndPoint}/getall`, {withCredentials: true});
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllCompanies();
    }, []);
}

export default useGetAllCompanies