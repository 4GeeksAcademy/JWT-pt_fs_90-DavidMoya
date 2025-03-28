import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(()=>{
        if (!token){
            navigate("/login", { replace: true })
        }
    },[token,navigate])

    return (
        <div className="text-center mt-5">
            <h1>Bienvenido</h1>
            <p>
                <img src={rigoImageUrl} />
            </p>
        </div>
    );
};