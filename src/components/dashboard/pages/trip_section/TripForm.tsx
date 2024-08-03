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
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

import Header from "../../dashboard_components/Header";
import { CompanyBusStations, CompanyTripInfo } from "./TripSectionTypes";
import { toast } from "react-toastify";
import { GenericApiResponse } from "../../../../utilities/Types";
import { apiClient } from "../../../../utilities/Axios";
import { useEffect, useState } from "react";

export default function TripForm(props: {
    handleSubmit(values: CompanyTripInfo): Promise<void>;
    buttonLabel: string;
}) {
    const [companyBusStationsState, setCompanyBusStationsState] = useState<
        CompanyBusStations[]
    >([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const apiResponse = (
                    await apiClient.get<
                        GenericApiResponse<CompanyBusStations[]>
                    >("/API/CompanyBusStation/GetAllDashboard")
                ).data;

                if (apiResponse.isSuccess)
                    setCompanyBusStationsState(
                        apiResponse.payload as CompanyBusStations[]
                    );
                else apiResponse.errors?.forEach((error) => toast.error(error));
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const validationSchema = Yup.object().shape({
        SourceBusStationId: Yup.string().required("*نقطة الانطلاق مطلوبة"),
        DestinationBusStationId: Yup.string()
            .required("*الوجهة مطلوبة")
            .test(
                "not-equal",
                "*يجب أن تكون الوجهة مختلفة عن نقطة الانطلاق",
                function (value) {
                    return this.parent.SourceBusStationId !== value;
                }
            ),
        ExpectedDepartTime: Yup.date().required("*وقت الانطلاق المتوقع مطلوب"),
        ExpectedArrivalTime: Yup.date()
            .required("*وقت الوصول المتوقع مطلوب")
            .min(
                Yup.ref("ExpectedDepartTime"),
                "*وقت الوصول يجب أن يكون أكبر من وقت الانطلاق"
            ),
        TicketPrice: Yup.number()
            .required("*سعر التذكرة مطلوب")
            .positive("*يجب أن يكون السعر موجباً")
            .integer("*سعر التذكرة يجب أن يكون رقماً صحيحاً"),
        BusId: Yup.number()
            .required("*معرف الحافلة مطلوب")
            .positive("*يجب أن يكون المعرف موجباً")
            .integer("*يجب أن يكون المعرف رقماً صحيحاً"),
        DriverId: Yup.number()
            .required("*معرف السائق مطلوب")
            .positive("*يجب أن يكون المعرف موجباً")
            .integer("*يجب أن يكون المعرف رقماً صحيحاً"),
        IsActive: Yup.boolean().required("*حالة الرحلة مطلوبة"),
    });
    const initialValues: CompanyTripInfo = {
        SourceBusStationId: "",
        DestinationBusStationId: "",
        ExpectedDepartTime: "",
        ExpectedArrivalTime: "",
        TicketPrice: 0,
        BusId: 0,
        DriverId: 0,
        IsActive: "",
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
                <Header title="إضافة رحلة جديدة" subTitle="معلومات الرحلة" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => props.handleSubmit(values)}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="source-station-label">
                                            نقطة الانطلاق
                                        </InputLabel>
                                        <Select
                                            labelId="source-station-label"
                                            id="SourceBusStationId"
                                            name="SourceBusStationId"
                                            label="نقطة الانطلاق"
                                            value={values.SourceBusStationId}
                                            onChange={handleChange}
                                            error={
                                                touched.SourceBusStationId &&
                                                Boolean(
                                                    errors.SourceBusStationId
                                                )
                                            }
                                        >
                                            {companyBusStationsState.map(
                                                (value) => (
                                                    <MenuItem
                                                        key={value.busStationId}
                                                        value={value.busStationId.toString()}
                                                    >
                                                        {value.fullName}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <ErrorMessage
                                            name="SourceBusStationId"
                                            component="div"
                                            style={{ color: "red" }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="destination-station-label">
                                            الوجهة
                                        </InputLabel>
                                        <Select
                                            labelId="destination-station-label"
                                            id="DestinationBusStationId"
                                            name="DestinationBusStationId"
                                            label="الوجهة"
                                            value={
                                                values.DestinationBusStationId
                                            }
                                            onChange={handleChange}
                                            error={
                                                touched.DestinationBusStationId &&
                                                Boolean(
                                                    errors.DestinationBusStationId
                                                )
                                            }
                                        >
                                            {companyBusStationsState.map(
                                                (value) => (
                                                    <MenuItem
                                                        key={value.busStationId}
                                                        value={value.busStationId.toString()}
                                                    >
                                                        {value.fullName}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <ErrorMessage
                                            name="DestinationBusStationId"
                                            component="div"
                                            style={{ color: "red" }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="ExpectedDepartTime"
                                        type="datetime-local"
                                        variant="outlined"
                                        fullWidth
                                        label="وقت الانطلاق المتوقع"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={
                                            touched.ExpectedDepartTime &&
                                            Boolean(errors.ExpectedDepartTime)
                                        }
                                        helperText={
                                            <ErrorMessage name="ExpectedDepartTime" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="ExpectedArrivalTime"
                                        type="datetime-local"
                                        variant="outlined"
                                        fullWidth
                                        label="وقت الوصول المتوقع"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={
                                            touched.ExpectedArrivalTime &&
                                            Boolean(errors.ExpectedArrivalTime)
                                        }
                                        helperText={
                                            <ErrorMessage name="ExpectedArrivalTime" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="TicketPrice"
                                        variant="outlined"
                                        fullWidth
                                        label="سعر التذكرة"
                                        type="number"
                                        error={
                                            touched.TicketPrice &&
                                            Boolean(errors.TicketPrice)
                                        }
                                        helperText={
                                            <ErrorMessage name="TicketPrice" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="BusId"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        label="معرف الحافلة"
                                        error={
                                            touched.BusId &&
                                            Boolean(errors.BusId)
                                        }
                                        helperText={
                                            <ErrorMessage name="BusId" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="DriverId"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        label="معرف السائق"
                                        error={
                                            touched.DriverId &&
                                            Boolean(errors.DriverId)
                                        }
                                        helperText={
                                            <ErrorMessage name="DriverId" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="is-active-label">
                                            هل الرحلة مفعلة؟
                                        </InputLabel>
                                        <Select
                                            labelId="is-active-label"
                                            id="IsActive"
                                            name="IsActive"
                                            label="هل الرحلة مفعلة؟"
                                            defaultValue={values.IsActive}
                                            onChange={handleChange}
                                            error={
                                                touched.IsActive &&
                                                Boolean(errors.IsActive)
                                            }
                                        >
                                            <MenuItem key={0} value="false">
                                                لا
                                            </MenuItem>
                                            <MenuItem key={1} value="true">
                                                نعم
                                            </MenuItem>
                                        </Select>
                                        <ErrorMessage
                                            name="IsActive"
                                            component="div"
                                            style={{ color: "red" }}
                                        />
                                    </FormControl>
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
