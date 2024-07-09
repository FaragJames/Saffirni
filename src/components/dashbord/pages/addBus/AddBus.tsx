import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, CssBaseline, TextField, Grid, Box, Container, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from "../../dashbord_components/Header";

const AddBus = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    BusType: Yup.string().required('*نوع الحافلة مطلوب'),
    plateNumber: Yup.string().required('*رقم اللوحة مطلوب'),
    NumberOfSeats: Yup.number().required('*عدد المقاعد مطلوب').positive('*يجب أن يكون عدد المقاعد موجبًا'),
    modelYear: Yup.number().required('*سنة الموديل مطلوبة').min(1900, '*سنة الموديل يجب أن تكون بعد 1900'),
  });

  const handleSubmit = (values) => {
    console.log(values);
    navigate('/dashboard/buses');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', direction: 'rtl' }}>
        <Header title="إضافة حافلة جديدة" subTitle="معلومات الحافلة" />
        <Formik initialValues={{ BusType: '', plateNumber: '', NumberOfSeats: '', modelYear: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="bus-type-label">نوع الحافلة</InputLabel>
                    <Select labelId="bus-type-label" id="BusType" name="BusType" value={values.BusType} onChange={handleChange} label="نوع الحافلة" error={touched.BusType && Boolean(errors.BusType)}>
                      <MenuItem value="">
                        <em>اختر نوع الحافلة</em>
                      </MenuItem>
                      <MenuItem value="Type A">Type A</MenuItem>
                      <MenuItem value="Type B">Type B</MenuItem>
                      <MenuItem value="Type C">Type C</MenuItem>
                    </Select>
                    <ErrorMessage name="BusType" component="div" />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Field as={TextField} name="plateNumber" variant="outlined" fullWidth label="رقم اللوحة" error={touched.plateNumber && Boolean(errors.plateNumber)} helperText={<ErrorMessage name="plateNumber" />} />
                </Grid>
                <Grid item xs={12}>
                  <Field as={TextField} name="NumberOfSeats" variant="outlined" fullWidth label="عدد المقاعد" type="number" error={touched.NumberOfSeats && Boolean(errors.NumberOfSeats)} helperText={<ErrorMessage name="NumberOfSeats" />} />
                </Grid>
                <Grid item xs={12}>
                  <Field as={TextField} name="modelYear" variant="outlined" fullWidth label="سنة الموديل" type="number" error={touched.modelYear && Boolean(errors.modelYear)} helperText={<ErrorMessage name="modelYear" />} />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                إضافة
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AddBus;
