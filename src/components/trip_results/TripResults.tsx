import { useNavigate } from "react-router-dom";
import "./TripResults.css";
import img from "../../assets/img.jpg";
import Rating from "@mui/material/Rating";
import { FilteredCompanyTrips } from "../trips/Trips";

export default function TripResults(props: {
    companyTrip: FilteredCompanyTrips
}) {
    const navigate = useNavigate();
    const handleNextClick = () => {
        navigate("/Bus", { state: { flight: props.companyTrip } });
    };
    return (
        <div className="flight-result">
            <div className="Hresult">
                <p>
                    وقت الانطلاق:{" "}
                    {new Date(
                        props.companyTrip.expectedDepartTime
                    ).toLocaleString("ar", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </p>
                <p>
                    وقت الوصول المتوقع:{" "}
                    {new Date(
                        props.companyTrip.expectedArrivalTime
                    ).toLocaleString("ar", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </p>
                {/* <p>عدد المقاعد المتبقية: {props.companyTrip.seatsAvailable}</p> */}
                <h5 className="price">{props.companyTrip.ticketPrice} S.P</h5>
                <button className="btn  flex" onClick={handleNextClick}>
                    احجز الآن
                </button>
            </div>
            <div className="Hresult">
                <p>اسم الشركة: {props.companyTrip.companyName}</p>
                <p>نوع الرحلة: {props.companyTrip.busType}</p>
                <p>من: {props.companyTrip.source}</p>
                <p>إلى: {props.companyTrip.destination}</p>
            </div>
            <div className="imresalt">
                <div className="imageDiv">
                    <img src={img} />
                </div>
                <Rating
                    dir="ltr"
                    name="half-rating-read"
                    defaultValue={1}
                    precision={1}
                    readOnly
                />
            </div>
        </div>
    );
}