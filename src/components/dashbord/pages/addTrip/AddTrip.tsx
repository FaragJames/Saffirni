import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, CssBaseline, TextField, Grid, Box, Container, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from "../../dashbord_components/Header";

const AddTrip = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    SourceBusStation: Yup.string().required('*نقطة الإنطلاق مطلوبة'),
    DestinationBusStation: Yup.string().required('*الوجهة مطلوبة'),
    ExpectedDepartTime: Yup.date().required('*وقت الإنطلاق المتوقع مطلوب'),
    ExpectedArrivalTime: Yup.date().required('*وقت الوصول المتوقع مطلوب'),
    TicketPrice: Yup.number().required('*سعر التذكرة مطلوب').positive('*يجب أن يكون السعر موجبًا'),
    TypeOfTheTrip: Yup.string().required('*نوع الرحلة مطلوب'),
    BusId: Yup.string().required('*معرف الحافلة مطلوب'),
    IsActive: Yup.boolean().required('*مفعلة مطلوبة'),
  });

  const handleSubmit = (values) => {
    console.log(values);
    navigate('/dashboard/trips');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          direction: 'rtl'
        }}
      >
        <Header title="إضافة رحلة جديدة" subTitle="معلومات الرحلة" />
        <Formik
          initialValues={{
            SourceBusStation: '',
            DestinationBusStation: '',
            ExpectedDepartTime: '',
            ExpectedArrivalTime: '',
            TicketPrice: '',
            TypeOfTheTrip: '',
            BusId: '',
            IsActive: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="source-station-label">نقطة الإنطلاق</InputLabel>
                    <Select
                      labelId="source-station-label"
                      id="SourceBusStation"
                      name="SourceBusStation"
                      value={values.SourceBusStation}
                      onChange={handleChange}
                      label="نقطة الإنطلاق"
                      error={touched.SourceBusStation && Boolean(errors.SourceBusStation)}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Station A">Station A</MenuItem>
                      <MenuItem value="Station B">Station B</MenuItem>
                      <MenuItem value="Station C">Station C</MenuItem>
                    </Select>
                    <ErrorMessage name="SourceBusStation" component="div" style={{ color: 'red' }} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="destination-station-label">الوجهة</InputLabel>
                    <Select
                      labelId="destination-station-label"
                      id="DestinationBusStation"
                      name="DestinationBusStation"
                      value={values.DestinationBusStation}
                      onChange={handleChange}
                      label="الوجهة"
                      error={touched.DestinationBusStation && Boolean(errors.DestinationBusStation)}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Station X">Station X</MenuItem>
                      <MenuItem value="Station Y">Station Y</MenuItem>
                      <MenuItem value="Station Z">Station Z</MenuItem>
                    </Select>
                    <ErrorMessage name="DestinationBusStation" component="div" style={{ color: 'red' }} />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="ExpectedDepartTime"
                    type="datetime-local"
                    variant="outlined"
                    fullWidth
                    label="وقت الإنطلاق المتوقع"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.ExpectedDepartTime && Boolean(errors.ExpectedDepartTime)}
                    helperText={<ErrorMessage name="ExpectedDepartTime" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="ExpectedArrivalTime"
                    type="datetime-local"
                    variant="outlined"
                    fullWidth
                    label="وقت الوصول المتوقع"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.ExpectedArrivalTime && Boolean(errors.ExpectedArrivalTime)}
                    helperText={<ErrorMessage name="ExpectedArrivalTime" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="TicketPrice"
                    variant="outlined"
                    fullWidth
                    label="سعر التذكرة"
                    type="number"
                    error={touched.TicketPrice && Boolean(errors.TicketPrice)}
                    helperText={<ErrorMessage name="TicketPrice" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="trip-type-label">نوع الرحلة</InputLabel>
                    <Select
                      labelId="trip-type-label"
                      id="TypeOfTheTrip"
                      name="TypeOfTheTrip"
                      value={values.TypeOfTheTrip}
                      onChange={handleChange}
                      label="نوع الرحلة"
                      error={touched.TypeOfTheTrip && Boolean(errors.TypeOfTheTrip)}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Local">Local</MenuItem>
                      <MenuItem value="International">International</MenuItem>
                    </Select>
                    <ErrorMessage name="TypeOfTheTrip" component="div" style={{ color: 'red' }} />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="BusId"
                    variant="outlined"
                    fullWidth
                    label="معرف الحافلة"
                    error={touched.BusId && Boolean(errors.BusId)}
                    helperText={<ErrorMessage name="BusId" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="is-active-label">مفعلة</InputLabel>
                    <Select
                      labelId="is-active-label"
                      id="IsActive"
                      name="IsActive"
                      value={values.IsActive}
                      onChange={handleChange}
                      label="مفعلة"
                      error={touched.IsActive && Boolean(errors.IsActive)}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                    <ErrorMessage name="IsActive" component="div" style={{ color: 'red' }} />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                إضافة
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AddTrip;
