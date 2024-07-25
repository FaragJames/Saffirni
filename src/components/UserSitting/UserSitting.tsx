import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserSitting = () => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('الاسم الأول مطلوب'),
    lastName: Yup.string().required('اسم العائلة مطلوب'),
    fatherName: Yup.string().required('اسم الأب مطلوب'),
    nationalId: Yup.string().required('الرقم الوطني مطلوب'),
    phoneNumber: Yup.string()
      .matches(/^09\d{8}$/, 'رقم الجوال يجب أن يبدأ ب09 ويتكون من 10 أرقام')
      .required('رقم الهاتف مطلوب'),
    password: Yup.string()
      .min(8, 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل')
      .required('كلمة المرور مطلوبة'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'يجب أن تتطابق كلمات المرور')
      .required('تأكيد كلمة المرور مطلوب'),
  });

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSubmit = (values) => {
    console.log(values);
    // Save the updated user information
    setIsEditable(false);
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ paddingTop: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', direction: 'rtl' }}>
        <Formik
          initialValues={{
            firstName: 'الاسم الأول الحالي',
            lastName: 'اسم العائلة الحالي',
            fatherName: 'اسم الأب الحالي',
            nationalId: 'الرقم الوطني الحالي',
            phoneNumber: '0912345678',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    label="الاسم الأول"
                    disabled={!isEditable}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={<ErrorMessage name="firstName" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    label="اسم العائلة"
                    disabled={!isEditable}
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
                    disabled={!isEditable}
                    error={touched.fatherName && Boolean(errors.fatherName)}
                    helperText={<ErrorMessage name="fatherName" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="nationalId"
                    variant="outlined"
                    fullWidth
                    label="الرقم الوطني"
                    disabled={!isEditable}
                    error={touched.nationalId && Boolean(errors.nationalId)}
                    helperText={<ErrorMessage name="nationalId" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="phoneNumber"
                    variant="outlined"
                    fullWidth
                    label="رقم الجوال"
                    disabled={!isEditable}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={<ErrorMessage name="phoneNumber" />}
                  />
                </Grid>
                {isEditable && (
                  <>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        name="password"
                        variant="outlined"
                        fullWidth
                        label="كلمة المرور"
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
                        label="تأكيد كلمة المرور"
                        type="password"
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={<ErrorMessage name="confirmPassword" />}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              {!isEditable ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleEditClick}
                  sx={{ mt: 3, mb: 2 }}
                >
                  تعديل
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  حفظ
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UserSitting;
