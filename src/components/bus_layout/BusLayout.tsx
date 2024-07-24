import { useEffect, useState } from "react";
import Seat from "../seat/Seat";
import "./BusLayout.css";
import { GiSteeringWheel } from "react-icons/gi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function BusLayout(props: {
    handleNextClick(seatsNumbers: number[]): Promise<void>;
    reservedSeats: number[];
    isVip: boolean;
}) {
    const [selectedSeats, setSelectedSeats] = useState<Array<number>>([]);
    const [allSeats, setAllSeats] = useState<number[]>([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        const tmpArray: number[] = [];
        for (let index = 1; index <= (props.isVip ? 33 : 43); index++) {
            tmpArray.push(index);
        }

        setAllSeats(tmpArray);
    }, []);

    function handleSeatClick(seatNumber: number) {
        let tmpArray = [...selectedSeats];
        if (tmpArray.includes(seatNumber))
            tmpArray = tmpArray.filter((item) => item !== seatNumber);
        else tmpArray.push(seatNumber);

        setSelectedSeats(tmpArray);
    }
    async function handleNextClick() {
        if (selectedSeats.length === 0)
            toast.error("الرجاء اختيار مقعد على الأقل للمتابعة!");
        else await props.handleNextClick(selectedSeats);
    }

    return (
        <div className="busLayout">
            <h2 className="title">اختر مقاعد الجلوس</h2>
            <div>
                <div className="busSeat">
                    <div
                        className={`${
                            props.isVip ? "seatsContainerVip" : "seatsContainer"
                        }`}
                    >
                        <GiSteeringWheel className="icon" />
                        {allSeats.map((seat) => (
                            <div
                                key={seat}
                                className={`seatWrapper seat-${seat}`}
                            >
                                <Seat
                                    key={seat}
                                    seatNumber={seat}
                                    isSelected={selectedSeats.includes(seat)}
                                    isReserved={props.reservedSeats.includes(
                                        seat
                                    )}
                                    onClick={handleSeatClick}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="seatInfo">
                    <p>عدد المقاعد المحجوزة: {selectedSeats.length}</p>
                    <p>المقاعد المحجوزة: {selectedSeats.join(", ")}</p>
                </div>
            </div>
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
