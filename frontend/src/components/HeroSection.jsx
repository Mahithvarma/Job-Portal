import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';
import store from '@/redux/store';

function HeroSection() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    }


    return (
        <div className='text-center'>
            <div className='flex flex-col gap-4 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 font-medium text-[#f83002]'>No. 1 Job Website!</span>
                <h1 className='text-4xl font-bold'>Search, Apply & <br />Get your <span className='text-[#6a38c2]'>Dream Jobs</span></h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam ea commodi, aspernatur numquam voluptatum reprehenderit odio distinctio veniam non praesentium!</p>
                <div className='flex w-[40%] shadow-md border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input onChange={(e)=> setQuery(e.target.value)} type='text' placeholder='Search for jobs' className='outline-none border-none w-full' />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6a38c2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
