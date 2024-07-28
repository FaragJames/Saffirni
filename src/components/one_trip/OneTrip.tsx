import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OneTrip.css";
import img from "../../assets/img.jpg";
import Rating from "@mui/material/Rating";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";

const OneTrip = ({ trip, handleDelete }) => {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("buttons");
  const navigate = useNavigate();
  const [rating, setRating] = useState();
  const handleDeleteClick = () => {
    handleDelete(trip.id);
  };
  const handleCompleteInfo = () => {
navigate("/travelerInfo");
  };

  const handleClick = (content) => {
    setDialogContent(content);
    setOpen(true);
  };

  return (
    <div className="trip-result">
      <div className="Hresult">
        <p>وقت الانطلاق: {trip.departureTime}</p>
        <p>وقت الوصول المتوقع: {trip.arrivalTime}</p>
        <p>عدد المقاعد المتبقية: {trip.seatsAvailable}</p>
        <h5 className="price">{trip.price} S.P</h5>
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
            onClick={() => handleClick("buttons")}
          >
            المزيد من التفاصيل
          </button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
          >
            <DialogTitle>المزيد من التفاصيل</DialogTitle>
            <DialogContent>
              {dialogContent === "buttons" && (
                <div style={{ display:"grid"}}>
                    <button
                    className="btn"
                    style={{
                      alignItems: "center",
                      color: "var(--WhiteColor)",
                      fontWeight: "700",
                      margin: " 1rem 1.5rem"
                    }}
                    onClick={() => handleCompleteInfo()}
                  >
                    تثبيت الرحلة
                  </button>
                  <button
                    className="btn"
                    style={{
                      alignItems: "center",
                      color: "var(--WhiteColor)",
                      fontWeight: "700",
                      margin: " 1rem 1.5rem",
                    }}
                    onClick={() => handleClick("comment")}
                  >
                    إضافة تعليق
                  </button>
                  <button
                    className="btn"
                    style={{
                      alignItems: "center",
                      color: "var(--WhiteColor)",
                      fontWeight: "700",
                      margin: " 1rem 1.5rem",
                    }}
                    onClick={() => handleClick("details")}
                  >
                    تفاصيل الرحلة
                  </button>
                  
                  <button
                    className="btn"
                    style={{
                      alignItems: "center",
                      color: "var(--WhiteColor)",
                      fontWeight: "700",
                      margin: " 1rem 1.5rem",
                    }}
                    onClick={() => handleClick("delete")}
                  >
                    حذف الرحلة
                  </button>
                
                </div>
              )}
              {dialogContent === "details" && (
                <div>
                  <Typography>تفاصيل الرحلة:</Typography>
                  <p>Company: {trip.airline}</p>
                  <p>Type: {trip.type}</p>
                  <p>From: {trip.from}</p>
                  <p>To: {trip.to}</p>
                </div>
              )}
              {dialogContent === "comment" && (
                <div>
                  <Typography>إضافة تعليق:</Typography>
                  <TextField
                    label="تعليق"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                  />
                  <div style={{ width:"100%", textAlign:"center"}}>
                   <div style={{width:"100%" , textAlign:"center"}}>
                   <Rating
                      sx={{marginTop:"2rem"}}
                      dir="ltr"
                      name="trip-rating"
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                      size="large"
                    />
                   </div>
                    
                     <button className="btn"
                    style={{
                      alignItems: "center",
                      color: "var(--WhiteColor)",
                      fontWeight: "700",
                      margin: " 1rem 1.5rem",
                    }} onClick={() => alert("Comment added")}>
                      إضافة
                    </button>
                  </div>
                </div>
              )}
              {dialogContent === "delete" && (
                <div>
                  <Typography>هل أنت متأكد أنك تريد حذف هذه الرحلة؟</Typography>
                  <Button onClick={() => handleDeleteClick(trip.id)}>
                    نعم
                  </Button>
                  <Button onClick={() => setOpen(false)}>لا</Button>
                </div>
              )}
            </DialogContent>
            {dialogContent !== "buttons" && (
              <DialogActions>
                <Button onClick={() => setDialogContent("buttons")}>
                  رجوع
                </Button>
                <Button onClick={() => setOpen(false)}>إغلاق</Button>
              </DialogActions>
            )}
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default OneTrip;
