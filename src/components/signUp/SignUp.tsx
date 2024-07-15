import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { SxProps } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import { apiClient } from "../../utilities/Axios";
import { toast } from "react-toastify";
import { ApiResponse } from "../../utilities/Types";

class SignUpInfo {
    public constructor(
        public firstName: string = "",
        public fatherName: string = "",
        public lastName: string = "",
        public nationalId: string = "",
        public phoneNumber: string = "",
        public password: string = "",
        public confirmPassword: string = ""
    ) {}
}
type SignUpInfoShape = {
    [P in keyof SignUpInfo]: Yup.StringSchema;
};

function Copyright(props: { sx: SxProps<Theme> }) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            <span>Copyright © </span>
            <Link color="inherit" to="/">
                Safirni
            </Link>
            <span> {new Date().getFullYear()}.</span>
        </Typography>
    );
}

export default function SignUp() {
    const validationShape: SignUpInfoShape = {
        firstName: Yup.string().required("*الاسم الأول مطلوب"),
        lastName: Yup.string().required("*الكنية مطلوبة"),
        fatherName: Yup.string().required("*اسم الأب مطلوب"),
        nationalId: Yup.string()
            .matches(/^\d{11}$/, "*الرقم الوطني يجب أن يتكون من 11 رقم")
            .required("*الرقم الوطني مطلوب"),
        phoneNumber: Yup.string()
            .matches(
                /^09\d{8}$/,
                "*رقم الجوال يجب أن يبدأ ب09 ويتكون من 10 أرقام"
            )
            .required("*رقم الهاتف مطلوب"),
        password: Yup.string()
            .min(6, "*كلمة السر يجب أن تتكون على الأقل من 6 محارف")
            .required("*كلمة السر مطلوبة"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "*كلمة السر غير متطابقة")
            .required("*تأكيد كلمة السر مطلوب"),
    };
    const validationSchema = Yup.object().shape(validationShape);

    const navigate = useNavigate();
    const handleSubmit = async (signUpInfo: SignUpInfo) => {
        try {
            const payload = {
                user: {
                    nationalId: signUpInfo.nationalId,
                    firstName: signUpInfo.firstName,
                    fatherName: signUpInfo.fatherName,
                    lastName: signUpInfo.lastName,
                    phoneNumber: signUpInfo.phoneNumber,
                },
                password: signUpInfo.password,
            };

            const response = await apiClient.post<ApiResponse>(`/Security/Account/SignUp/User`, payload);
            const apiResponse = response.data;

            if (apiResponse.isSuccess) {
                if(apiResponse.message)
                    toast.success(apiResponse.message)
                navigate("/SignIn");
                return;
            }
            apiResponse.errors?.forEach((error) => 
                toast.error(error)
            )
        } catch (exception) {
            console.error(exception);
        }
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
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    component="h1"
                    variant="h5"
                    style={{ marginBottom: "20px" }}
                >
                    إنشاء حساب جديد
                </Typography>
                <Formik
                    initialValues={new SignUpInfo()}
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
                                        error={
                                            touched.firstName &&
                                            Boolean(errors.firstName)
                                        }
                                        helperText={
                                            <ErrorMessage name="firstName" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        as={TextField}
                                        name="lastName"
                                        variant="outlined"
                                        fullWidth
                                        label="الكنية"
                                        error={
                                            touched.lastName &&
                                            Boolean(errors.lastName)
                                        }
                                        helperText={
                                            <ErrorMessage name="lastName" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="fatherName"
                                        variant="outlined"
                                        fullWidth
                                        label="اسم الأب"
                                        error={
                                            touched.fatherName &&
                                            Boolean(errors.fatherName)
                                        }
                                        helperText={
                                            <ErrorMessage name="fatherName" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="nationalId"
                                        variant="outlined"
                                        fullWidth
                                        label="الرقم الوطني"
                                        error={
                                            touched.nationalId &&
                                            Boolean(errors.nationalId)
                                        }
                                        helperText={
                                            <ErrorMessage name="nationalId" />
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
                                        error={
                                            touched.phoneNumber &&
                                            Boolean(errors.phoneNumber)
                                        }
                                        helperText={
                                            <ErrorMessage name="phoneNumber" />
                                        }
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
                                        label="تأكيد كلمة السر"
                                        type="password"
                                        error={
                                            touched.confirmPassword &&
                                            Boolean(errors.confirmPassword)
                                        }
                                        helperText={
                                            <ErrorMessage name="confirmPassword" />
                                        }
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
                                    <Link to="/SignIn">لديك حساب بالفعل؟</Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}
