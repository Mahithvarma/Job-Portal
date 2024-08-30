import Navbar from '@/components/shared/Navbar'
import { Input } from "../components/ui/input"
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useSelector } from 'react-redux'

function Companies() {
    const navigate = useNavigate();
    useGetAllCompanies();
    const { companies } = useSelector(store => store.company);

    const [filterCompany, setFilterCompany] = React.useState("");
    const [filteredCompanies, setFilteredCompanies] = React.useState(companies);
    

    useEffect(()=>{
        setFilteredCompanies(companies.filter(company=> company.name.toLowerCase().includes(filterCompany.toLowerCase())));
    }, [filterCompany, companies]);
    
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input placeholder='Search Companies' className="w-fit" onChange={(e)=> setFilterCompany(e.target.value)}/>
                    <Button onClick={()=> navigate("/admin/companies/create")}>Add Company</Button>
                </div>
                <CompaniesTable companies={filteredCompanies}/>
            </div>
        </div>
    )
}

export default Companies