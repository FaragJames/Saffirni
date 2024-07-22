import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { FakeSeat } from "../../App";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import "./SelectSeat.css";

export default function SelectSeats(props: { seatsData: Array<FakeSeat> }) {
    const [remainingSeats, setRemainingSeats] = useState<Array<FakeSeat>>([]);
    const [numSeatsToSelect, setNumSeatsToSelect] = useState<number>(0);
    const [selectedSeats, setSelectedSeats] = useState<Array<number>>([]);
    const [showWarning, setShowWarning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Filter out the reserved seats
        const availableSeats = props.seatsData.filter(seat => !seat.reserved && !seat.selected);
        setRemainingSeats(availableSeats);
    }, [props.seatsData]);

    const handleSeatSelection = () => {
        if (numSeatsToSelect > remainingSeats.length || numSeatsToSelect <= 0) {
            setShowWarning(true);
            return;
        }

        setShowWarning(false);

        // Select seats from the end to the start
        const newlySelectedSeats = remainingSeats.slice(-numSeatsToSelect).map(seat => seat.number);
        setSelectedSeats(newlySelectedSeats);

        console.log("Selected seats:", newlySelectedSeats); // Debugging statement

        // Update the seats data in parent state or context (depending on your implementation)
        // For now, just navigate to another page or perform any other action you need
        // navigate('/some-other-page');
    };

    return (
        <>
            <Navbar />
            <div className="selectSeatsLayout">
                <Typography variant="h4" className="title">إختر عدد المقاعد</Typography>
                <div className="seatInfo">
                    <Typography variant="body1">عدد المقاعد المتاحة: {remainingSeats.length}</Typography>
                </div>
                <TextField
                    label="عدد المقاعد"
                    type="number"
                    value={numSeatsToSelect.toFixed(0)}
                    onChange={(e) => setNumSeatsToSelect(Number(e.target.value))}
                    InputProps={{ inputProps: { min: 1, max: remainingSeats.length  } }}
                    className="numSeatsInput"
                />
                <div className="buttonContainer">
                    <button  className="btn" onClick={() => navigate(-1)}>إلغاء</button>
                    <button className="btn" onClick={handleSeatSelection}>التالي</button>
                </div>
                {showWarning && (
                    <Typography variant="body2" color="error" className="warning">الرجاء إدخال عدد صحيح من المقاعد المتاحة</Typography>
                )}
            </div>
            <Footer />
        </>
    );
}
