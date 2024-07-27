import { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataContext, User } from "../../utilities/Context";
import { toast } from "react-toastify";
import { apiClient } from "../../utilities/Axios";
import { ApiResponse, GenericApiResponse } from "../../utilities/Types";

export default function UserSettings() {
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(false);

    const context = useContext(DataContext);
    if (!context.state.id) {
        toast.error("يرجى تسجيل الدخول أولاً!");
        navigate("/SignIn");
        return;
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("*الاسم الأول مطلوب"),
        lastName: Yup.string().required("*الكنية مطلوبة"),
        fatherName: Yup.string().required("*اسم الأب مطلوب"),
        phoneNumber: Yup.string()
            .matches(
                /^09[3,4,5,6,8,9]\d{7}$/,
                "*رقم الموبايل يجب أن يبدأ ب09 ويتكون من 10 أرقام"
            )
            .required("*رقم الموبايل مطلوب"),
    });

    async function handleSubmit(values: {
        firstName: string;
        fatherName: string;
        lastName: string;
        phoneNumber: string;
    }) {
        setIsEditable(false);
        const requestBody: Array<{
            op: string;
            path: string;
            value: string;
        }> = [];
        requestBody.push({
            op: "replace",
            path: "firstName",
            value: values.firstName,
        });
        requestBody.push({
            op: "replace",
            path: "fatherName",
            value: values.fatherName,
        });
        requestBody.push({
            op: "replace",
            path: "lastName",
            value: values.lastName,
        });
        requestBody.push({
            op: "replace",
            path: "phoneNumber",
            value: values.phoneNumber,
        });

        try {
            const apiResponse = (
                await apiClient.patch<ApiResponse>(
                    `/API/User/${context.state.id}`,
                    requestBody
                )
            ).data;
            if (apiResponse.isSuccess) {
                if (apiResponse.message) toast.success(apiResponse.message);
                const getUserResponse = (
                    await apiClient.get<GenericApiResponse<User>>(
                        `/API/User/${context.state.id}`
                    )
                ).data;
                if(getUserResponse.isSuccess) {
                    if(context.dispatcher)
                        context.dispatcher({ type: "assign", payload: getUserResponse.payload as User })

                    return;
                }
                
                getUserResponse.errors?.forEach((error) => toast.error(error));    
            }

            apiResponse.errors?.forEach(error => toast.error(error))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    paddingTop: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    direction: "rtl",
                }}
            >
                <Formik
                    initialValues={{
                        firstName: context.state.firstName as string,
                        lastName: context.state.lastName as string,
                        fatherName: context.state.fatherName as string,
                        phoneNumber: context.state.phoneNumber as string,
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
                                        name="firstName"
                                        variant="outlined"
                                        fullWidth
                                        label="الاسم الأول"
                                        disabled={!isEditable}
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
                                        name="lastName"
                                        variant="outlined"
                                        fullWidth
                                        label="الكنية"
                                        disabled={!isEditable}
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
                                        disabled={!isEditable}
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
                                        name="phoneNumber"
                                        variant="outlined"
                                        fullWidth
                                        label="رقم الموبايل"
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
                            </Grid>
                            {!isEditable ? (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setIsEditable(true);
                                    }}
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
