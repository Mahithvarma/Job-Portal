import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import store from '@/redux/store';
import { CompanyEndPoint } from '@/utils/APIRoutes';
import axios from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useGetCompanyById from '@/hooks/useGetCompanyById';

function CompanySetup() {
    const params = useParams();
    const companyId = params.id;
    useGetCompanyById(companyId);


    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const {singleCompany} = useSelector(store=>store.company);


    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file});
    }


    useEffect(()=>{
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if(input.file){
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const response = await axios.put(`${CompanyEndPoint}/update/${companyId}`, formData, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials: true
            });

            if(response.data.success){
                toast.success(response.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            if(error.response){
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Something went wrong.!")
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={handleSubmit}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={()=> navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-2xl'>Company Setup</h1>
                    </div>

                    <div className='grid grid-cols-2 gap-3 my-5'>
                        <Label>Company Name</Label>
                        <Input type="text" name="name" value={input.name} onChange={handleChange} />

                    </div>
                    
                    <div className='grid grid-cols-2 gap-3 my-5'>
                        <Label>Description</Label>
                        <Input type="text" name="description" value={input.description} onChange={handleChange} />

                    </div>

                    <div className='grid grid-cols-2 gap-3 my-5'>
                        <Label>Website</Label>
                        <Input type="text" name="website" value={input.website} onChange={handleChange} />

                    </div>

                    <div className='grid grid-cols-2 gap-3 my-5'>
                        <Label>Location</Label>
                        <Input type="text" name="location" value={input.location} onChange={handleChange} />

                    </div>

                    <div className='grid grid-cols-2 gap-3 my-5'>
                        <Label>Company Logo</Label>
                        <Input type="file" accept="image/*" name="file" onChange={handleFileChange} />

                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button> : <Button type="submit" className="w-full my-4">Update</Button>
                    }
                </form>

            </div>
        </div>
    )
}

export default CompanySetup