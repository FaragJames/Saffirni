import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Container,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../dashboard_components/Header";
import { useContext, useEffect, useState } from "react";
import { apiClient } from "../../../../utilities/Axios";
import { ApiResponse, GenericApiResponse } from "../../../../utilities/Types";
import { toast } from "react-toastify";
import { BusStatus, BusType } from "../buses/Buses";
import { EmployeeContext } from "../../../../utilities/Contexts/EmployeeContext";

type AddBusInfo = {
    busTypeId: string;
    busStatusId: string;
    plateNumber: number;
    modelYear: number;
};

export default function AddBus() {
    const [busStatusesState, setBusStatusesState] = useState<BusStatus[]>([]);
    const [busTypesState, setBusTypesState] = useState<BusType[]>([]);

    const context = useContext(EmployeeContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const busStatusesResponse = (await apiClient.get<GenericApiResponse<BusStatus[]>>("/Api/BusStatus")).data
            const busTypesResponse = (
                await apiClient.get<GenericApiResponse<BusType[]>>(
                    "/Api/BusType"
                )
            ).data;

            if(busStatusesResponse.isSuccess && busStatusesResponse.payload)
                setBusStatusesState(busStatusesResponse.payload)
            else
                busStatusesResponse.errors?.forEach(error => toast.error(error))

            if (busTypesResponse.isSuccess && busTypesResponse.payload)
                setBusTypesState(busTypesResponse.payload);
            else
                busTypesResponse.errors?.forEach((error) => toast.error(error));
        }

        fetchData()
    }, [])

    const validationSchema = Yup.object().shape({
        busTypeId: Yup.string().required("*نوع الحافلة مطلوب"),
        busStatusId: Yup.string().required("*حالة الحافلة مطلوبة"),
        plateNumber: Yup.number()
            .required("*رقم اللوحة مطلوب")
            .min(100000, "*يجب أن يتكون رقم اللوحة من 6 أرقام")
            .max(999999, "*يجب أن يتكون رقم اللوحة من 6 أرقام"),
        modelYear: Yup.number()
            .required("*سنة الموديل مطلوبة")
            .min(2000, "*سنة الموديل يجب أن تكون بعد 2000"),
    });


    async function handleSubmit(values: AddBusInfo) {
        try {
            const apiResponse = (
                await apiClient.post<ApiResponse>("/API/Bus/AddDashboard", {
                busTypeId: parseInt(values.busTypeId),
                busStatusId: parseInt(values.busStatusId),
                plateNumber: values.plateNumber,
                modelYear: values.modelYear,
                companyId: context.state.companyId as number
            })
            ).data;

            if(apiResponse.isSuccess) {
                if(apiResponse.message)
                    toast.success(apiResponse.message)
                navigate("/Company/Dashboard/Buses");
            }
            else
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
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    direction: "rtl",
                }}
            >
                <Header title="إضافة حافلة جديدة" subTitle="معلومات الحافلة" />
                <Formik
                    initialValues={{
                        busTypeId: "",
                        busStatusId: "",
                        plateNumber: 0,
                        modelYear: 0,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="bus-type-id-label">
                                            نوع الحافلة
                                        </InputLabel>
                                        <Select
                                            labelId="bus-type-id-label"
                                            id="busTypeId"
                                            name="busTypeId"
                                            value={values.busTypeId}
                                            onChange={handleChange}
                                            label="نوع الحافلة"
                                            error={
                                                touched.busTypeId &&
                                                Boolean(errors.busTypeId)
                                            }
                                        >
                                            {busTypesState.map((busType) => (
                                                <MenuItem
                                                    key={busType.id}
                                                    value={busType.id}
                                                >
                                                    {`${busType.typeName} - ${busType.numberOfSeats}`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <ErrorMessage
                                            name="busTypeId"
                                            component="div"
                                            style={{ color: "red" }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="bus-status-id-label">
                                            حالة الحافلة
                                        </InputLabel>
                                        <Select
                                            labelId="bus-status-id-label"
                                            id="busStatusId"
                                            name="busStatusId"
                                            value={values.busStatusId}
                                            onChange={handleChange}
                                            label="حالة الحافلة"
                                            error={
                                                touched.busStatusId &&
                                                Boolean(errors.busStatusId)
                                            }
                                        >
                                            {busStatusesState.map(
                                                (busStatus) => (
                                                    <MenuItem
                                                        key={busStatus.id}
                                                        value={busStatus.id}
                                                    >
                                                        {busStatus.statusName}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <ErrorMessage
                                            name="busStatusId"
                                            component="div"
                                            style={{ color: "red" }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="plateNumber"
                                        variant="outlined"
                                        fullWidth
                                        label="رقم اللوحة"
                                        type="number"
                                        error={
                                            touched.plateNumber &&
                                            Boolean(errors.plateNumber)
                                        }
                                        helperText={
                                            <ErrorMessage name="plateNumber" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="modelYear"
                                        variant="outlined"
                                        fullWidth
                                        label="سنة الموديل"
                                        type="number"
                                        error={
                                            touched.modelYear &&
                                            Boolean(errors.modelYear)
                                        }
                                        helperText={
                                            <ErrorMessage name="modelYear" />
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