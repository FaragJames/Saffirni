import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seat from "../seat/Seat";
import "./bus.css";
import Footer from "../footer/Footer";

const Bus = ({ seatsData, handleBusSubmit, handleUpdateFakeData }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const numSelected = seatsData.map((seat) => {
            if (seat.selected) return seat.number;
            else return "!";
        });
        const finalUpdated = numSelected.filter((sec) => sec !== "!");
        setSelectedSeats(finalUpdated);
    }, []);

    const handleSeatClick = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(
                selectedSeats.filter((seat) => seat !== seatNumber)
            );
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
        handleUpdateFakeData(seatNumber);
    };

    const handleNextClick = () => {
        handleBusSubmit(selectedSeats.length);
        navigate("/travelerInfo"); // الانتقال إلى صفحة MyTrips
    };

    return (
        <>
            <div className="busLayout">
                <h2>باص</h2>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    {seatsData.map((seat, index) => (
                        <div
                            key={seat.number}
                            style={{
                                width: "125px",
                                display: "flex",
                                justifyContent:
                                    index % 2 === 0 ? "flex-end" : "flex-start",
                            }}
                        >
                            <Seat
                                key={seat.number}
                                seatNumber={seat.number}
                                isSelected={selectedSeats.includes(seat.number)}
                                isReserved={seat.reserved}
                                onClick={() => handleSeatClick(seat.number)}
                            />
                            {(index + 1) % 2 === 0 &&
                                index !== seatsData.length - 1 && (
                                    <span>&nbsp;&nbsp;</span>
                                )}
                            {(index + 1) % 2 === 0 && <br />}
                        </div>
                    ))}
                </div>
                <div>
                    <p>المقاعد المحجوزة: {selectedSeats.length}</p>
                    <p>المقاعد المحجوزة: {selectedSeats.join(", ")}</p>
                </div>
                <button
                    className="btn"
                    onClick={handleNextClick}
                    style={{
                        border: "none",
                        color: "#fff",
                        marginBottom: "3rem",
                        marginTop: "1rem",
                    }}
                >
                    <span>التالي</span>
                </button>
                <button
                    className="btn"
                    onClick={() => {
                        navigate("/");
                    }}
                    style={{
                        border: "none",
                        color: "#fff",
                        marginBottom: "3rem",
                        marginTop: "1rem",
                    }}
                >
                    <span>العودة</span>
                </button>
            </div>

            <Footer />
        </>
    );
};

export default Bus;
