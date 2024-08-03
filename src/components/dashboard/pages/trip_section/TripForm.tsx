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
    editValues: CompanyTripInfo | undefined;
    headerLabel: string;
    buttonLabel: string;
}) {
    const [companyBusStationsState, setCompanyBusStationsState] = useState<
        CompanyBusStations[]
    >([]);
    const [editValuesState, setEditValuesState] = useState<CompanyTripInfo>({
        SourceBusStationId: "",
        DestinationBusStationId: "",
        ExpectedDepartTime: "",
        ExpectedArrivalTime: "",
        ActualArrivalTime: null,
        ActualDepartTime: null,
        TicketPrice: 0,
        BusId: 0,
        DriverId: 0,
        IsActive: "",
    });
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
        if(props.editValues)
            setEditValuesState(props.editValues)
    }, [props.editValues]);

    const validationSchema = Yup.object().shape({
        sourceBusStationId: Yup.string().required("*نقطة الانطلاق مطلوبة"),
        destinationBusStationId: Yup.string()
            .required("*الوجهة مطلوبة")
            .test(
                "not-equal",
                "*يجب أن تكون الوجهة مختلفة عن نقطة الانطلاق",
                function (value) {
                    return this.parent.SourceBusStationId !== value;
                }
            ),
        expectedDepartTime: Yup.date().required("*وقت الانطلاق المتوقع مطلوب"),
        expectedArrivalTime: Yup.date()
            .required("*وقت الوصول المتوقع مطلوب")
            .min(
                Yup.ref("ExpectedDepartTime"),
                "*وقت الوصول يجب أن يكون أكبر من وقت الانطلاق"
            ),
        ticketPrice: Yup.number()
            .required("*سعر التذكرة مطلوب")
            .positive("*يجب أن يكون السعر موجباً")
            .integer("*سعر التذكرة يجب أن يكون رقماً صحيحاً"),
        busId: Yup.number()
            .required("*معرف الحافلة مطلوب")
            .positive("*يجب أن يكون المعرف موجباً")
            .integer("*يجب أن يكون المعرف رقماً صحيحاً"),
        driverId: Yup.number()
            .required("*معرف السائق مطلوب")
            .positive("*يجب أن يكون المعرف موجباً")
            .integer("*يجب أن يكون المعرف رقماً صحيحاً"),
        isActive: Yup.boolean().required("*حالة الرحلة مطلوبة"),
    });

    console.log(editValuesState)

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
                <Header title={props.headerLabel} subTitle="معلومات الرحلة" />
                <Formik
                    enableReinitialize={true}
                    initialValues={editValuesState}
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
                                            id="sourceBusStationId"
                                            name="sourceBusStationId"
                                            label="نقطة الانطلاق"
                                            value={values.sourceBusStationId}
                                            onChange={handleChange}
                                            error={
                                                touched.sourceBusStationId &&
                                                Boolean(
                                                    errors.sourceBusStationId
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
                                            name="sourceBusStationId"
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
                                            id="destinationBusStationId"
                                            name="destinationBusStationId"
                                            label="الوجهة"
                                            value={
                                                values.destinationBusStationId
                                            }
                                            onChange={handleChange}
                                            error={
                                                touched.destinationBusStationId &&
                                                Boolean(
                                                    errors.destinationBusStationId
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
                                            name="destinationBusStationId"
                                            component="div"
                                            style={{ color: "red" }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="expectedDepartTime"
                                        type="datetime-local"
                                        variant="outlined"
                                        fullWidth
                                        label="وقت الانطلاق المتوقع"
                                        value={values.expectedDepartTime}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={
                                            touched.expectedDepartTime &&
                                            Boolean(errors.expectedDepartTime)
                                        }
                                        helperText={
                                            <ErrorMessage name="expectedDepartTime" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="expectedArrivalTime"
                                        type="datetime-local"
                                        variant="outlined"
                                        fullWidth
                                        label="وقت الوصول المتوقع"
                                        value={values.expectedArrivalTime}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={
                                            touched.expectedArrivalTime &&
                                            Boolean(errors.expectedArrivalTime)
                                        }
                                        helperText={
                                            <ErrorMessage name="expectedArrivalTime" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="ticketPrice"
                                        variant="outlined"
                                        fullWidth
                                        label="سعر التذكرة"
                                        type="number"
                                        value={values.ticketPrice}
                                        onChange={handleChange}
                                        error={
                                            touched.ticketPrice &&
                                            Boolean(errors.ticketPrice)
                                        }
                                        helperText={
                                            <ErrorMessage name="ticketPrice" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="busId"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        label="معرف الحافلة"
                                        value={values.busId}
                                        onChange={handleChange}
                                        error={
                                            touched.busId &&
                                            Boolean(errors.busId)
                                        }
                                        helperText={
                                            <ErrorMessage name="busId" />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="driverId"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        label="معرف السائق"
                                        value={values.driverId}
                                        onChange={handleChange}
                                        error={
                                            touched.driverId &&
                                            Boolean(errors.driverId)
                                        }
                                        helperText={
                                            <ErrorMessage name="driverId" />
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
                                            id="isActive"
                                            name="isActive"
                                            label="هل الرحلة مفعلة؟"
                                            value={values.isActive}
                                            onChange={handleChange}
                                            error={
                                                touched.isActive &&
                                                Boolean(errors.isActive)
                                            }
                                        >
                                            <MenuItem key="false" value="false">
                                                لا
                                            </MenuItem>
                                            <MenuItem key="true" value="true">
                                                نعم
                                            </MenuItem>
                                        </Select>
                                        <ErrorMessage
                                            name="isActive"
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
