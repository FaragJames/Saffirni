import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Container
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../dashboard_components/Header";

export default function Settings() {
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(false);

    const validationSchema = Yup.object().shape({
        NameOfCompany: Yup.string().required("اسم الشركة مطلوب"),
        email: Yup.string()
            .email("بريد إلكتروني غير صالح")
            .required("البريد الإلكتروني مطلوب"),
        phoneNumber: Yup.string()
            .matches(
                /^09\d{8}$/,
                "رقم الجوال يجب أن يبدأ ب09 ويتكون من 10 أرقام"
            )
            .required("رقم الهاتف مطلوب"),
        password: Yup.string()
            .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
            .required("كلمة المرور مطلوبة"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "يجب أن تتطابق كلمات المرور")
            .required("تأكيد كلمة المرور مطلوب"),
    });

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleSubmit = (values) => {
        console.log(values);
        // Save the updated company information
        setIsEditable(false);
        navigate("/dashboard/sitting");
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    direction: "rtl",
                }}
            >
                <Header
                    title="معلومات الشركة"
                    subTitle="تعديل معلومات الشركة"
                />
                <Formik
                    initialValues={{
                        NameOfCompany: "اسم الشركة الحالية",
                        email: "example@example.com",
                        phoneNumber: "0912345678",
                        password: "",
                        confirmPassword: "",
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
                                        name="NameOfCompany"
                                        variant="outlined"
                                        fullWidth
                                        label="اسم الشركة"
                                        disabled={!isEditable}
                                        error={
                                            touched.NameOfCompany &&
                                            Boolean(errors.NameOfCompany)
                                        }
                                        helperText={
                                            <ErrorMessage name="NameOfCompany" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        variant="outlined"
                                        fullWidth
                                        label="البريد الإلكتروني"
                                        disabled={!isEditable}
                                        error={
                                            touched.email &&
                                            Boolean(errors.email)
                                        }
                                        helperText={
                                            <ErrorMessage name="email" />
                                        }
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
                                        error={
                                            touched.phoneNumber &&
                                            Boolean(errors.phoneNumber)
                                        }
                                        helperText={
                                            <ErrorMessage name="phoneNumber" />
                                        }
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
                                                error={
                                                    touched.password &&
                                                    Boolean(errors.password)
                                                }
                                                helperText={
                                                    <ErrorMessage name="password" />
                                                }
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
                                                error={
                                                    touched.confirmPassword &&
                                                    Boolean(
                                                        errors.confirmPassword
                                                    )
                                                }
                                                helperText={
                                                    <ErrorMessage name="confirmPassword" />
                                                }
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
}
