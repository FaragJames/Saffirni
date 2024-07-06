import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OneTrip.css";
import img from "../../assets/img.jpg";
import Rating from "@mui/material/Rating";
import Box from "@mui/system/Box";
import { Input as BaseInput } from "@mui/base/Input";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
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
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        handleDelete(trip.id); // Assuming each trip has a unique id
    };
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

const blue = {
    100: "#DAECFF",
    200: "#80BFFF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B2",
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};

const RootDiv = styled("div")`
    display: flex;
    max-width: 100%;
`;

const TextareaElement = styled(TextareaAutosize)(
    ({ theme }) => `
  width: 320px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px 8px 0 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default OneTrip;
