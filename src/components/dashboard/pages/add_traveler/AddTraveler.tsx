import { useState } from 'react';
import { Box, Button, Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddTraveler = () => {
  const [seatNumber, setSeatNumber] = useState('');
  const [seatStatus, setSeatStatus] = useState('');
  const [travelerName, setTravelerName] = useState('');
  const [nationalID, setNationalID] = useState('');
  const navigate = useNavigate();

  const handleSeatNumberChange = (event) => {
    setSeatNumber(event.target.value);
  };

  const handleSeatStatusChange = (event) => {
    setSeatStatus(event.target.value);
  };

  const handleTravelerNameChange = (event) => {
    setTravelerName(event.target.value);
  };

  const handleNationalIDChange = (event) => {
    setNationalID(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      seatNumber,
      seatStatus,
      travelerName,
      nationalID
    });
    navigate('/dashboard/seatsontrip');
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          إضافة مسافر
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 6 }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="seat-number-label">رقم المقعد</InputLabel>
            <Select
              labelId="seat-number-label"
              id="seat-number"
              value={seatNumber}
              label="رقم المقعد"
              onChange={handleSeatNumberChange}
            >
              {[...Array(40).keys()].map((num) => (
                <MenuItem key={num + 1} value={num + 1}>
                  {num + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="seat-status-label">حالة المقعد</InputLabel>
            <Select
              labelId="seat-status-label"
              id="seat-status"
              value={seatStatus}
              label="حالة المقعد"
              onChange={handleSeatStatusChange}
            >
              <MenuItem value="متاح">متاح</MenuItem>
              <MenuItem value="ممتلئ">ممتلئ</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="traveler-name"
            label="اسم المسافر"
            name="travelerName"
            value={travelerName}
            onChange={handleTravelerNameChange}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="national-id"
            label="الرقم الوطني"
            name="nationalID"
            value={nationalID}
            onChange={handleNationalIDChange}
            sx={{ mt: 2 }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            إضافة
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddTraveler;
