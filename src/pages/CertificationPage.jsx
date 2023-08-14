import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import ImgUpload from "../components/ImgUpload";
export default function CertificationPage () {
    const location = useLocation();
    const authId = location.state.authId;
    const detailPlanId = location.state.detailPlanId;
    const planId = location.state.planId;

    const [mine, setMine] = useState(null);
    const isItMine = () => {
        if (localStorage.getItem('auth_id') === authId){
        setMine(true);
        }
        else {
        setMine(false);
        }
    }

    
    useEffect(() => {isItMine();}, []);
    return (

        <div>
        {mine === true ? <ImgUpload/> : null}
        </div>
    );
}