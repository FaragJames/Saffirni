import React from "react";
import "./TravelerInfo.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";

const TravelerInfo = ({ numReservedSeats }) => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate("/Bus");
    };
    const num = numReservedSeats ? numReservedSeats : 0;
    return (
        <>
            <div className="TravelerInfo">
                <h2 className="title">حجز المقاعد</h2>
                {Array.from({ length: num }, (_, index) => (
                    <form className="form" key={index}>
                        <h3 className="sectitel">كرسي رقم {index + 1}</h3>
                        <Box
                            component="form"
                            sx={{
                                "& .MuiTextField-root": { m: 1, width: "25ch" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                name={`nationalID_${index}`}
                                required
                                id="outlined-required"
                                type="number"
                                label="الرقم الوطني"
                            />

                            <TextField
                                name={`name_${index}`}
                                required
                                id="outlined-required"
                                label=" الإسم الكامل"
                            />
                        </Box>
                        <br />
                    </form>
                ))}

                <button
                    className="btn"
                    style={{
                        border: "none",
                        color: "#fff",
                        marginBottom: "3rem",
                        marginTop: "1rem",
                    }}
                    onClick={() => {
                        navigate("/check-in");
                    }}
                >
                    <span>التالي</span>
                </button>
                <button
                    className="btn"
                    onClick={handleBackClick}
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

export default TravelerInfo;
