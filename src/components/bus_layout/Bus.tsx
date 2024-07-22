import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seat from "../seat/Seat";
import "./bus.css";
import Footer from "../footer/Footer";
import { GiSteeringWheel } from "react-icons/gi";
import { FakeSeat } from "../../App";

export default function Bus(props: { seatsData: Array<FakeSeat>; }) {
    const [updatedSeatsData, setUpdatedSeatsData] = useState(props.seatsData);
    const [selectedSeats, setSelectedSeats] = useState<Array<number>>();

    const [showWarning, setShowWarning] = useState(false); // State for warning message
    const navigate = useNavigate();

    useEffect(() => {
        const numSelected = updatedSeatsData.filter((seat) => seat.selected).map((seat) => seat.number);
        setSelectedSeats(numSelected);
    }, [updatedSeatsData]);

    const handleSeatClick = (seatNumber: number) => {
        const updatedSeats = updatedSeatsData.map((seat) =>
            seat.number === seatNumber
                ? { ...seat, selected: !seat.selected }
                : seat
        );

        setUpdatedSeatsData(updatedSeats);
        setSelectedSeats(
            updatedSeats
                .filter((seat) => seat.selected)
                .map((seat) => seat.number)
        );
    };

    const handleNextClick = () => {
        if (selectedSeats && selectedSeats.length === 0) {
            setShowWarning(true);
            return;
        }

        console.log("handleNextClick called"); // Debugging statement
        console.log("Selected seats:", selectedSeats); // Debugging statement
    };

    return (
        <div className="busLayout">
            <h2 className="title">إختر مقاعد الجلوس</h2>
            <div className="busSeat">
                <GiSteeringWheel className="icon" />
                <div className="seatsContainer">
                    {updatedSeatsData.map((seat) => (
                        <div key={seat.number} className="seatWrapper">
                            <Seat
                                key={seat.number}
                                seatNumber={seat.number}
                                isSelected={selectedSeats?.includes(
                                    seat.number
                                )}
                                isReserved={seat.reserved}
                                onClick={() => handleSeatClick(seat.number)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="seatInfo">
                <p>المقاعد المحجوزة: {selectedSeats?.length}</p>
                <p>المقاعد المحجوزة: {selectedSeats?.join(", ")}</p>
            </div>
            <div className="buttonContainer">
                <button
                    className="btn"
                    onClick={handleNextClick}
                    disabled={selectedSeats?.length === 0}
                >
                    <span>التالي</span>
                </button>
                <button className="btn" onClick={() => navigate("/")}>
                    <span>العودة</span>
                </button>
            </div>
            {showWarning && (
                <div className="warning">
                    <p>الرجاء اختيار مقعد قبل المتابعة</p>
                </div>
            )}
        </div>
    );
}