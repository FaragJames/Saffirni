import { Formik, Form, ErrorMessage } from "formik";
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
import Header from "../../dashboard_components/Header";
import { AddBusInfo, BusStatus, BusType } from "./BusSectionTypes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../../../../utilities/Axios";
import { GenericApiResponse } from "../../../../utilities/Types";

export default function BusForm(props: {
    handleSubmit(values: AddBusInfo): Promise<void>;
    editValues: AddBusInfo | undefined;
    headerLabel: string;
    buttonLabel: string;
}) {
    const [busStatusesState, setBusStatusesState] = useState<BusStatus[]>([]);
    const [busTypesState, setBusTypesState] = useState<BusType[]>([]);
    console.log(props.editValues)

    useEffect(() => {
        async function fetchData() {
            const busStatusesResponse = (
                await apiClient.get<GenericApiResponse<BusStatus[]>>(
                    "/Api/BusStatus"
                )
            ).data;
            const busTypesResponse = (
                await apiClient.get<GenericApiResponse<BusType[]>>(
                    "/Api/BusType"
                )
            ).data;

            if (busStatusesResponse.isSuccess && busStatusesResponse.payload)
                setBusStatusesState(busStatusesResponse.payload);
            else
                busStatusesResponse.errors?.forEach((error) =>
                    toast.error(error)
                );

            if (busTypesResponse.isSuccess && busTypesResponse.payload)
                setBusTypesState(busTypesResponse.payload);
            else
                busTypesResponse.errors?.forEach((error) => toast.error(error));
        }

        fetchData();
    }, []);

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
                <Header title={props.headerLabel} subTitle="معلومات الحافلة" />
                <Formik
                    initialValues={
                        props.editValues
                            ? props.editValues
                            : {
                                  busTypeId: "",
                                  busStatusId: "",
                                  plateNumber: 0,
                                  modelYear: 0,
                              }
                    }
                    validationSchema={validationSchema}
                    onSubmit={(values) => props.handleSubmit(values)}
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
                                                    value={busType.id.toString()}
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
                                                        value={busStatus.id.toString()}
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
                                    <TextField
                                        name="plateNumber"
                                        variant="outlined"
                                        fullWidth
                                        label="رقم اللوحة"
                                        type="number"
                                        value={values.plateNumber}
                                        onChange={handleChange}
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
                                    <TextField
                                        name="modelYear"
                                        variant="outlined"
                                        fullWidth
                                        label="سنة الموديل"
                                        type="number"
                                        value={values.modelYear}
                                        onChange={handleChange}
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
                                {props.buttonLabel}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}
