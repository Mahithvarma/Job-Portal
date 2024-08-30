import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

const category = [
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Cyber Security",
    "Artificial Intelligence",
    "UI/UX Designer",
    "Mobile App Developer",
    "Blockchain Developer",
    "Business Analyst",
    "Game Developer",
    "QA Engineer",
    "Product Manager",
    "Technical Writer",
    "Database Administrator",
    "Network Engineer",
    "System Administrator",
    "Embedded Engineer",
    "Project Manager",
]

function CategoryCarousel() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-28">
                <CarouselContent>
                    {category.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Button onClick={()=>searchJobHandler(item)} variant="outline" className="rounded-full">{item}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
