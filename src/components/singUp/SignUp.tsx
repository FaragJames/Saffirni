import * as React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://Safirni.com/">
        Safirni
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('*الاسم الأول مطلوب'),
    lastName: Yup.string().required('*الكنية مطلوبة'),
    fatherName: Yup.string().required('*اسم الأب مطلوب'),
    nationalNumber: Yup.string()
      .matches(/^\d{11}$/, 'الرقم الوطني يجب أن يتكون من 11 رقم')
      .required('الرقم الوطني مطلوب'),
    PhoneNumber: Yup.string()
      .matches(/^09\d{8}$/, 'رقم الجوال يجب أن يبدأ ب09 ويتكون من 10 أرقام')
      .required('رقم الهاتف مطلوب'),
    password: Yup.string().min(8, '*كلمة السر يجب أن تتكون على الأقل من 8 محارف')
      .required('*كلمة السر مطلوبة'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'كلمة السر غير متطابقة')
      .required('تأكيد كلمة السر مطلوب'),
  });

  const handleSubmit = (values) => {
    localStorage.setItem('user', JSON.stringify(values));
    navigate('/SignIn');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ marginBottom: "20px" }}>
            إنشاء حساب جديد
          </Typography>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              fatherName: '',
              nationalNumber: '',
              PhoneNumber: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="firstName"
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
                      name="fatherName"
                      variant="outlined"
                      fullWidth
                      label="اسم الأب"
                      error={touched.fatherName && Boolean(errors.fatherName)}
                      helperText={<ErrorMessage name="fatherName" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="nationalNumber"
                      variant="outlined"
                      fullWidth
                      label="الرقم الوطني"
                      error={touched.nationalNumber && Boolean(errors.nationalNumber)}
                      helperText={<ErrorMessage name="nationalNumber" />}
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
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="password"
                      variant="outlined"
                      fullWidth
                      label="كلمة السر"
                      type="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={<ErrorMessage name="password" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="confirmPassword"
                      variant="outlined"
                      fullWidth
                      label="تأكيد كلمة السر"
                      type="password"
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={<ErrorMessage name="confirmPassword" />}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  إنشاء الحساب
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="./SignIn" variant="body2">
                      لديك حساب بالفعل؟ تسجيل دخول
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
