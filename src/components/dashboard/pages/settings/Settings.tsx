import { useContext, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Container,
} from "@mui/material";
import Header from "../../dashboard_components/Header";
import { apiClient } from "../../../../utilities/Axios";
import { ApiResponse, GenericApiResponse, PatchRequest } from "../../../../utilities/Types";
import { toast } from "react-toastify";
import { EmployeeContext } from "../../../../utilities/Contexts/EmployeeContext";

type CompanySettings = {
    name: string;
    email: string;
    phoneNumber: string;
};

export default function Settings() {
    const [companyState, setCompanyState] = useState<CompanySettings>({
        name: "",
        email: "",
        phoneNumber: "",
    });

    const context = useContext(EmployeeContext);
    useEffect(() => {
        async function fetchData() {
            const apiResponse = (
                await apiClient.get<GenericApiResponse<CompanySettings[]>>(
                    `/API/Company/GetCompaniesInfo?id=${context.state.companyId}`
                )
            ).data;

            if (apiResponse.isSuccess && apiResponse.payload)
                setCompanyState(apiResponse.payload[0]);
            else apiResponse.errors?.forEach((error) => toast.error(error));
        }

        fetchData();
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("اسم الشركة مطلوب*"),
        email: Yup.string()
            .email("بريد إلكتروني غير صالح*")
            .required("البريد الإلكتروني مطلوب*"),
        phoneNumber: Yup.string()
            .matches(
                /^09[3,4,5,6,8,9]\d{7}$/,
                "رقم الموبايل يجب أن يبدأ ب09 ويتكون من 10 أرقام*"
            )
            .required("رقم الموبايل مطلوب*"),
    });

    async function handleSubmit(values: CompanySettings) {
        const request: PatchRequest[] = [];
        if (values.name !== companyState.name)
            request.push({
                op: "replace",
                path: "name",
                value: values.name,
            });
        if (values.email !== companyState.email)
            request.push({
                op: "replace",
                path: "email",
                value: values.email,
            });
        if (values.phoneNumber !== companyState.phoneNumber)
            request.push({
                op: "replace",
                path: "phoneNumber",
                value: values.phoneNumber,
            });
        
        if(request.length === 0) {
            toast.info("ليست هنالك أية تغييرات.")
            return;
        }
        const apiResponse = (
            await apiClient.patch<ApiResponse>(`/API/Company/${context.state.companyId}`, request)
        ).data;
        if (apiResponse.isSuccess) {
            if (apiResponse.message) toast.success(apiResponse.message);
        } else apiResponse.errors?.forEach((error) => toast.error(error));
        
        location.reload();
    }

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
                    enableReinitialize={true}
                    initialValues={companyState}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        variant="outlined"
                                        fullWidth
                                        label="اسم الشركة"
                                        value={values.name}
                                        onChange={handleChange}
                                        error={
                                            touched.name && Boolean(errors.name)
                                        }
                                        helperText={
                                            <ErrorMessage name="name" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="email"
                                        variant="outlined"
                                        fullWidth
                                        label="البريد الإلكتروني"
                                        value={values.email}
                                        onChange={handleChange}
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
                                    <TextField
                                        name="phoneNumber"
                                        variant="outlined"
                                        fullWidth
                                        label="رقم الموبايل"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                حفظ
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}