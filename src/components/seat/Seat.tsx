import { MdChair } from "react-icons/md";

export default function Seat(props: {
    seatNumber: number;
    isSelected: boolean;
    isReserved: boolean;
    onClick(seatNumber: number): void;
}) {
    let seatColor = "grey";
    let cursorStyle = "pointer";

    if (props.isSelected) {
        seatColor = "green";
    } else if (props.isReserved) {
        seatColor = "red";
        cursorStyle = "not-allowed";
    }

    return (
        <MdChair
            style={{
                width: "35px",
                height: "35px",
                margin: "5px",
                display: "inline-block",
                rotate: "-90deg",
                color: seatColor,
                cursor: cursorStyle,
                pointerEvents: props.isReserved ? "none" : "auto"
            }}
            onClick={() => props.onClick(props.seatNumber)}
        />
    );
}