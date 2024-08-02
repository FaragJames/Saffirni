import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Header from "../../dashboard_components/Header";
import { useContext } from "react";
import { EmployeeContext } from "../../../../utilities/Contexts/EmployeeContext";
import { apiClient } from "../../../../utilities/Axios";
import { ApiResponse } from "../../../../utilities/Types";
import { toast } from "react-toastify";

type EmployeeInfo = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
};
type EmployeeInfoShape = {
    [P in keyof EmployeeInfo]: Yup.StringSchema;
};

export default function AddEmployee() {
    const context = useContext(EmployeeContext);
    const navigate = useNavigate();

    const validationShape: EmployeeInfoShape = {
        firstName: Yup.string().required("*الاسم الأول مطلوب"),
        lastName: Yup.string().required("*الكنية مطلوبة"),
        phoneNumber: Yup.string()
            .matches(
                /^09[3,4,5,6,8,9]\d{7}$/,
                "*رقم الموبايل يجب أن يبدأ ب09 ويتكون من 10 أرقام"
            )
            .required("*رقم الموبايل مطلوب"),
        email: Yup.string()
            .email("*البريد الإلكتروني غير صالح")
            .required("*البريد الإلكتروني مطلوب"),
        password: Yup.string()
            .min(6, "*كلمة السر يجب أن تتكون على الأقل من 6 محارف")
            .required("*كلمة السر مطلوبة"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "*كلمة السر غير متطابقة")
            .required("*تأكيد كلمة السر مطلوب"),
    };
    const validationSchema = Yup.object().shape(validationShape);
    const initialValue: EmployeeInfo = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    async function handleSubmit(values: EmployeeInfo) {
        try {
            const apiResponse = (
                await apiClient.post<ApiResponse>("/Security/Account/SignUp/Employee", {
                    employee: {
                        companyId: context.state.companyId,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        phoneNumber: values.phoneNumber,
                    },
                    email: values.email,
                    password: values.password
                })
            ).data;

            if(apiResponse.isSuccess) {
                if(apiResponse.message)
                    toast.success(apiResponse.message);

                navigate("/Company/Dashboard/Employees");
            }
            else
                apiResponse.errors?.forEach(error => toast.error(error))
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    direction: "rtl",
                }}
                style={{ direction: "ltr" }}
            >
                <Header title="إضافة موظف جديد" subTitle="معلومات الموظف" />
                <Formik
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Grid
                                style={{ direction: "ltr" }}
                                container
                                spacing={2}
                            >
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
                                <Grid
                                    style={{ direction: "ltr" }}
                                    item
                                    xs={12}
                                    sm={6}
                                >
                                    <Field
                                        as={TextField}
                                        name="firstName"
                                        variant="outlined"
                                        fullWidth
                                        label="الاسم الأول"
                                        error={
                                            touched.firstName &&
                                            Boolean(errors.firstName)
                                        }
                                        helperText={
                                            <ErrorMessage name="firstName" />
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="phoneNumber"
                                        variant="outlined"
                                        fullWidth
                                        label="رقم الموبايل"
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
                                        name="email"
                                        variant="outlined"
                                        fullWidth
                                        label="البريد الإلكتروني"
                                        type="email"
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
                                إضافة
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}
