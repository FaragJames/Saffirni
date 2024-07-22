import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seat from "../seat/Seat";
import "./bus.css";
import Footer from "../footer/Footer";
import { GiSteeringWheel } from "react-icons/gi";
import { FakeSeat } from "../../App";
import Navbar from "../navbar/Navbar";

export default function Bus(props: { seatsData: Array<FakeSeat>, vipType: boolean }) {
    
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
        <>
            <Navbar />
            <div className="busLayout">
                <h2 className="title">إختر مقاعد الجلوس</h2>
                <div>
                    <div className="busSeat">
                        <div className={`${props.vipType? "seatsContainerVip": "seatsContainer"}`}>
                            <GiSteeringWheel className="icon" />
                            {updatedSeatsData.map((seat) => (
                                <div
                                    key={seat.number}
                                    className={`seatWrapper seat-${seat.number}`}
                                >
                                    <Seat
                                        key={seat.number}
                                        seatNumber={seat.number}
                                        isSelected={selectedSeats?.includes(seat.number)}
                                        isReserved={seat.reserved}
                                        onClick={() => handleSeatClick(seat.number)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="seatInfo">
                        <p> عدد المقاعد المحجوزة: {selectedSeats?.length}</p>
                        <p>المقاعد المحجوزة: {selectedSeats?.join(", ")}</p>
                    </div>

                </div>
                <div className="buttonContainer">
                    <button
                        className="btn"
                        onClick={handleNextClick}
                    >
                        التالي
                    </button>
                    <button className="btn">إلغاء</button>
                </div>
                {showWarning && ( // Render warning message if no seats are selected
                    <div className="warning">
                        <p>الرجاء اختيار مقعد على الأقل للمتابعة</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
