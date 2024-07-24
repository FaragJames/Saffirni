import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import "./SeatsInput.css";
import { toast } from "react-toastify";

export default function SeatsInput(props: {
    handleNextClick(seatsNumbers: number[]): Promise<void>;
    reservedSeats: number[];
    totalSeats: number;
}) {
    const [selectedSeatsNumber, setSelectedSeatsNumber] = useState<number>(0);
    const remainingSeats = props.totalSeats - props.reservedSeats.length;
    const navigate = useNavigate();

    const handleNextClick = () => {
        if (selectedSeatsNumber > remainingSeats || selectedSeatsNumber <= 0)
            toast.error("الرجاء إدخال عدد صحيح من المقاعد المتاحة");
        else {
            const selectedSeats: number[] = [];
            let tmpTotalSeats = props.totalSeats;
            for (let index = 0; index < selectedSeatsNumber; ) {
                if (!props.reservedSeats.includes(tmpTotalSeats)) {
                    index++;
                    selectedSeats.push(tmpTotalSeats);
                }
                tmpTotalSeats--;
            }

            props.handleNextClick(selectedSeats);
        }
    };

    return (
        <div className="selectSeatsLayout">
            <Typography variant="h4" className="title">
                إختر عدد المقاعد
            </Typography>
            <div className="seatInfo">
                <Typography variant="body1">
                    عدد المقاعد المتاحة: {remainingSeats - selectedSeatsNumber}
                </Typography>
            </div>
            <TextField
                label="عدد المقاعد"
                type="number"
                defaultValue={0}
                onChange={(e) =>
                    setSelectedSeatsNumber(parseInt(e.target.value))
                }
                InputProps={{
                    inputProps: {
                        min: 1,
                        max: remainingSeats,
                    },
                }}
                className="numSeatsInput"
            />
            <div className="buttonContainer">
                <button className="btn" onClick={handleNextClick}>
                    التالي
                </button>
                <button className="btn" onClick={() => navigate(-1)}>
                    إلغاء
                </button>
            </div>
        </div>
    );
}
