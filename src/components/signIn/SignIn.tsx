import * as React from 'react';
import { useState } from 'react';
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
      {'حقوق الطبع والنشر © '}
      <Link color="inherit" href="https://Safirni.com/">
        Safirni
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  const validationSchema = Yup.object().shape({
    identifier: Yup.string()
      .test('test-identifier', 'يرجى إدخال رقم جوال صحيح يبدأ بـ 09 (10 أرقام) أو رقم وطني (11 رقم) أو بريد إلكتروني صالح',
        value => {
          const phoneRegex = /^09\d{8}$/;
          const nationalNumberRegex = /^\d{11}$/;
          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          return phoneRegex.test(value) || nationalNumberRegex.test(value) || emailRegex.test(value);
        }
      )
      .required('الحقل مطلوب'),
    password: Yup.string().required('كلمة السر مطلوبة'),
  });

  const handleSubmit = (values) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && 
        (storedUser.PhoneNumber === values.identifier || storedUser.nationalNumber === values.identifier || storedUser.email === values.identifier) && 
        storedUser.password === values.password) {
      localStorage.setItem("auth", "true");
      setAuth(true);
      navigate('/');
    } else {
      alert('رقم الجوال أو الرقم الوطني أو البريد الإلكتروني أو كلمة السر غير صحيحة');
    }
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
            تسجيل الدخول
          </Typography>
          <Formik
            initialValues={{
              identifier: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="identifier"
                      variant="outlined"
                      fullWidth
                      label="رقم الجوال أو الرقم الوطني أو البريد الإلكتروني"
                      error={touched.identifier && Boolean(errors.identifier)}
                      helperText={<ErrorMessage name="identifier" />}
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
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  تسجيل الدخول
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="./SignUp" variant="body2">
                      ليس لديك حساب؟ إنشاء حساب
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

export default SignIn;
