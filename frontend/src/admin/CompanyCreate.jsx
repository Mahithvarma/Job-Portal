import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setSingleCompany } from '@/redux/CompanySlice'
import { CompanyEndPoint } from '@/utils/APIRoutes'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function CompanyCreate() {
    const [companyName, setCompanyName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const response = await axios.post(`${CompanyEndPoint}/register`, {name: companyName}, {withCredentials: true});
            if(response.data.success){
                toast.success(response.data.message);
                const company = response.data.company;
                dispatch(setSingleCompany(response.data.company));
                navigate(`/admin/companysetup/${company?._id}`);
            }
        } catch (error) {
            console.log(error);
            if(error.response){
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Something went wrong.!")
            }
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate