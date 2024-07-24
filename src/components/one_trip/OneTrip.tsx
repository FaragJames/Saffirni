import { useState } from "react";
import "./OneTrip.css";
import img from "../../assets/img.jpg";
import Rating from "@mui/material/Rating";
import Box from "@mui/system/Box";
import { TextField } from "@mui/material";

// const Input = React.forwardRef(function CustomInput(props, ref) {
//   return (
//     <BaseInput
//       slots={{
//         root: RootDiv,
//         input: "input",
//         textarea: TextareaElement,
//       }}
//       {...props}
//       style={{ resize: "none" }}
//       ref={ref}
//     />
//   );
// });

const OneTrip = ({ trip, handleDelete }) => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState();

    const resizeObserverLoopErr = () => {};
    window.addEventListener("error", (e) => {
        if (e.message === "ResizeObserver loop limit exceeded") {
            e.stopImmediatePropagation();
            resizeObserverLoopErr();
        }
    });

    return (
        <div className="trip-result">
            <div className="Hresult">
                <p>وقت الانطلاق: {trip.departureTime}</p>
                <p>وقت الوصول المتوقع: {trip.arrivalTime}</p>
                <p>عدد المقاعد المتبقية: {trip.seatsAvailable}</p>
                <h5 className="price">{trip.price} S.P</h5>
                {/* <button className="btn flex" onClick={handleDeleteClick}>حذف الرحلة</button> */}
            </div>
            <div className="Hresult">
                <p>اسم الشركة: {trip.airline}</p>
                <p>نوع الرحلة: {trip.type}</p>
                <p>من: {trip.from}</p>
                <p>إلى: {trip.to}</p>
            </div>
            <div className="imresalt">
                <div className="imageDiv">
                    <img src={img} alt="Trip" />
                </div>
                <div className="ratingDiv">
                    <button
                        className="btn flex"
                        type="button"
                        onClick={() => setOpen(true)}
                    >
                        إضافة تعليق
                    </button>
                    {open && (
                        <Box
                            className="boxRating"
                            tabIndex={-1}
                            sx={{ mt: 1, p: 1 }}
                        >
                            <Rating
                                name="trip-rating"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                            <br />
                            <label>
                                أضف تعليقك:{" "}
                                {/* <Input
                  aria-label="Demo input"
                  multiline
                  placeholder="Type something…"
                /> */}
                                <TextField
                                    aria-label="Demo input"
                                    multiline
                                    placeholder="Type something…"
                                />
                            </label>
                            <br />
                            <button
                                className="btn flex"
                                type="button"
                                onClick={() => setOpen(false)}
                            >
                                إرسال
                            </button>
                        </Box>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OneTrip;