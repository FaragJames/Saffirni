import { useState } from 'react';
import { Box, Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, Slider, Typography, Button, Grid } from '@mui/material';

const MoreFilter = () => {
  const [companyName, setCompanyName] = useState('');
  const [tripType, setTripType] = useState('');
  const [ticketPrice, setTicketPrice] = useState([0, 100]);

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const handleTicketPriceChange = (event, newValue) => {
    setTicketPrice(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      companyName,
      tripType,
      ticketPrice,
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          marginBottom:3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 6, width: '100%' }}>
          <Grid container spacing={2} alignItems="center" gap={3}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="company-name-label">اسم شركة النقل</InputLabel>
                <Select
                  labelId="company-name-label"
                  id="company-name"
                  value={companyName}
                  label="Name of Company"
                  onChange={handleCompanyNameChange}
                >
                  <MenuItem value="Company1">Company1</MenuItem>
                  <MenuItem value="Company2">Company2</MenuItem>
                  <MenuItem value="Company3">Company3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="trip-type-label">نوع الرحلة</InputLabel>
                <Select
                  labelId="trip-type-label"
                  id="trip-type"
                  value={tripType}
                  label="Type of Trip"
                  onChange={handleTripTypeChange}
                >
                  <MenuItem value="Type1">Type1</MenuItem>
                  <MenuItem value="Type2">Type2</MenuItem>
                  <MenuItem value="Type3">Type3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Typography gutterBottom>
               سعر بطاقة الرحلة
              </Typography>
              <Slider
                value={ticketPrice}
                onChange={handleTicketPriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={50000}
              />
            </Grid>
            <Grid item xs={2}>
              <Button type="submit" fullWidth variant="contained">
                بحث
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default MoreFilter;
