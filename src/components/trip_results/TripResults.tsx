import React from "react";
import { useNavigate } from "react-router-dom";
import "./TripResults.css";
import img from "../../assets/img.jpg";
import Rating from "@mui/material/Rating";

const TripResults = ( {flight}) => {
    
    
    const navigate = useNavigate();
    const handleNextClick = () => {
        
     navigate("/Bus",{state:{flight:flight}});
    };
    return (
        <div className="flight-result">
            <div className="Hresult">
                <p>وقت الانطلاق: {flight.departureTime}</p>
                <p>وقت الوصول المتوقع: {flight.arrivalTime}</p>
                <p>عدد المقاعد المتبقية: {flight.seatsAvailable}</p>
                <h5 className="price">{flight.price} S.P</h5>
                <button className="btn  flex" onClick={handleNextClick}>
                    احجز الآن
                </button>
            </div>
            <div className="Hresult">
                <p>اسم الشركة: {flight.airline}</p>
                <p>نوع الرحلة: {flight.type}</p>
                <p>من: {flight.from}</p>
                <p>إلى: {flight.to}</p>
            </div>
            <div className="imresalt">
                <div className="imageDiv">
                    <img src={img} />
                </div>
                <Rating
                dir="ltr"
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                />
            </div>
        </div>
    );
};
export default TripResults;
