import { setSingleCompany } from '@/redux/CompanySlice';
import { CompanyEndPoint } from '@/utils/APIRoutes';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetCompanyById(companyId) {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanyById = async () => {
            try {
                const res = await axios.get(`${CompanyEndPoint}/get/${companyId}`, {withCredentials: true});
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchCompanyById();
    }, [companyId, dispatch]);
}

export default useGetCompanyById