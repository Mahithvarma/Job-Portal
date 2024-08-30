import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StudentProtectedRoute = ({children}) => {
    const {user} = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user===null || user.role !== "student"){
            navigate("/");
        }
    }, []);

    return (
        <>
        {children}
        </>
    )
}

export default StudentProtectedRoute