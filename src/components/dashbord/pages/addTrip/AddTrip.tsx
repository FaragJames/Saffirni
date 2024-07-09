import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Header from "../../dashbord_components/Header";

const AddTrip = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required('*الاسم الأول مطلوب'),
      lastName: Yup.string().required('*الكنية مطلوبة'),
      PhoneNumber: Yup.string()
        .matches(/^09\d{8}$/, 'رقم الجوال يجب أن يبدأ ب09 ويتكون من 10 أرقام')
        .required('رقم الهاتف مطلوب'),
      });
  
    const handleSubmit = () => {
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
              direction:'rtl'
            }}
            style={{direction:"ltr"}}
          >
              <Header
              
                title="إضافة موظف جديد"
                subTitle="معلومات الموظف"
            />
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                PhoneNumber: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Grid style={{direction:"ltr"}} container spacing={2}>
                    <Grid style={{direction:"ltr"}} item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="firstName"
                        direction="rtl"
                        variant="outlined"
                        fullWidth
                        label="الاسم"
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={<ErrorMessage name="firstName" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="lastName"
                        variant="outlined"
                        fullWidth
                        label="الكنية"
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={<ErrorMessage name="lastName" />}
                      />
                    </Grid>
                   
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        name="PhoneNumber"
                        variant="outlined"
                        fullWidth
                        label="رقم الجوال"
                        error={touched.PhoneNumber && Boolean(errors.PhoneNumber)}
                        helperText={<ErrorMessage name="PhoneNumber" />}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >

إضافة                  </Button>
                  
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
    );
};

export default AddTrip;
