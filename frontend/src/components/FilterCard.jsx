import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button';

const filterData = [
    {
        filterType: "Location",
        items: ["Delhi NCR", "Bangalore", "Mumbai", "Hyderabad", "Chennai", "Pune", "Noida"]
    },
    {
        filterType: "Industry",
        items: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps", "Data Science", "Machine Learning", "Artificial Intelligence"]
    },
    {
        filterType: "Salary",
        items: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15-25 LPA", "25-50 LPA", "50+ LPA"]
    }
]

function FilterCard({ setSearchOption }) {

    const [selectedValue, setSelectedValue] = useState('');
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(() => {
        setSearchOption(selectedValue)
    }, [selectedValue]);

    return (
        <div className='w-full bg-white rounded-md'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
                <Button onClick={() => setSelectedValue("")} className="mx-5 h-8">Clear</Button>
            </div>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.items.map((item, index) => (
                                    <div key={index} className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} id={item} />
                                        <Label htmlFor={item} className="text-sm text-gray-600">{item}</Label>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
