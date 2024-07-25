import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OneTrip.css";
import img from "../../assets/img.jpg";
import Rating from "@mui/material/Rating";
import Box from "@mui/system/Box";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper, Typography, TextField } from "@mui/material";

const OneTrip = ({ trip, handleDelete }) => {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    handleDelete(trip.id);
  };

  const handleClick = (content) => {
    setDialogContent(content);
    setOpen(!open);
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
          <Button className="btn flex" type="button" onClick={() => handleClick('details')}>
            المزيد من التفاصيل
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>المزيد من التفاصيل</DialogTitle>
            <DialogContent>
              {dialogContent === 'details' && (
                <div>
                  <Typography>تفاصيل الرحلة:</Typography>
                  <p>Company: {trip.airline}</p>
                  <p>Type: {trip.type}</p>
                  <p>From: {trip.from}</p>
                  <p>To: {trip.to}</p>
                </div>
              )}
              {dialogContent === 'comment' && (
                <div>
                  <Typography>إضافة تعليق:</Typography>
                  <TextField
                    label="Comment"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                  />
                  <Button onClick={() => alert('Comment added')}>إضافة</Button>
                </div>
              )}
              {dialogContent === 'delete' && (
                <div>
                  <Typography>هل أنت متأكد أنك تريد حذف هذه الرحلة؟</Typography>
                  <Button onClick={() => handleDeleteClick(trip.id)}>نعم</Button>
                  <Button onClick={() => setOpen(false)}>لا</Button>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>إغلاق</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default OneTrip;
