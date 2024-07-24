import { useContext, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { SxProps } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataContext, User } from "../../utilities/Context";
import { GenericApiResponse } from "../../utilities/Types";
import { apiClient } from "../../utilities/Axios";

class SignInInfo {
    public constructor(
        public credential: string = "",
        public password: string = ""
    ) {}
}
type SignInInfoShape = {
    [P in keyof SignInInfo]: Yup.StringSchema;
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

export default function SignIn() {
    const context = useContext(DataContext)
    const navigate = useNavigate();
    const isEmployee = useRef(false);

    const validationShape: SignInInfoShape = {
        credential: Yup.string()
            .test(
                "test-credential",
                "*يرجى إدخال رقم جوال صحيح يبدأ بـ 09 (10 أرقام) أو رقم وطني (11 رقم) أو بريد إلكتروني صالح",
                (value) => {
                    value = value as string;
                    const phoneRegex = /^09\d{8}$/;
                    const nationalNumberRegex = /^\d{11}$/;
                    const emailRegex =
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                    isEmployee.current = emailRegex.test(value);
                    return (
                        phoneRegex.test(value) ||
                        nationalNumberRegex.test(value) ||
                        isEmployee.current
                    );
                }
            )
            .required("*الحقل مطلوب"),
        password: Yup.string()
            .min(6, "*كلمة السر يجب أن تتكون على الأقل من 6 محارف")
            .required("*كلمة السر مطلوبة"),
    };
    const validationSchema = Yup.object().shape(validationShape);

    const handleSubmit = async (signInInfo: SignInInfo) => {
        try {
            const payload = {
                credential: signInInfo.credential,
                password: signInInfo.password,
            };

            const response = await apiClient.post<GenericApiResponse<User>>(
                `/Security/Account/${
                    isEmployee.current ? "LogIn/Employee" : "LogIn/WebUser"
                }`,
                payload
            );
            const apiResponse = response.data;

            if (apiResponse.isSuccess && apiResponse.payload) {
                if(apiResponse.message)
                    toast.success(apiResponse.message);

                sessionStorage.setItem("user", JSON.stringify(apiResponse.payload))
                if(context.dispatcher)
                    context.dispatcher({type: "assign", payload: apiResponse.payload})
                navigate("/");
                return;
            }
            apiResponse.errors?.forEach((error) => {
                toast.error(error);
            });
        } catch (error) {
            // if(axios.isAxiosError<ApiResponse>(error))
            console.error(error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    paddingTop: 14,
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
                    تسجيل الدخول
                </Typography>
                <Formik
                    initialValues={new SignInInfo()}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="credential"
                                        variant="outlined"
                                        fullWidth
                                        label="رقم الجوال أو الرقم الوطني أو البريد الإلكتروني"
                                        error={
                                            touched.credential &&
                                            Boolean(errors.credential)
                                        }
                                        helperText={
                                            <ErrorMessage name="credential" />
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
                                    <Link to="/SignUp">ليس لديك حساب؟</Link>
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
