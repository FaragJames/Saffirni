import { Container, CssBaseline, Box, Grid, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import Header from "../../dashboard_components/Header";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ApiResponse, EditRouteParams, GenericApiResponse, PatchRequest } from "../../../../utilities/Types";
import { toast } from "react-toastify";
import { apiClient } from "../../../../utilities/Axios";
import * as Yup from "yup";

type SeatStatus = {
    id: number;
    statusName: string;
}

export default function EditSeatStatus() {
    const [state, setState] = useState<SeatStatus[]>([]);
    const params = useParams<EditRouteParams>();
    const navigate = useNavigate();

    const locationState = useLocation().state
    const seatStatusId = locationState ? locationState as number : null

    useEffect(() => {
        async function fetchData() {
            const apiResponse = (
                await apiClient.get<GenericApiResponse<SeatStatus[]>>(
                    `/API/SeatStatus`
                )
            ).data;

            if (apiResponse.isSuccess && apiResponse.payload)
                setState(apiResponse.payload);
            else apiResponse.errors?.forEach((error) => toast.error(error));
        }

        if (params.id && seatStatusId) fetchData();
        else  navigate(-1);
    }, [])
    if (!params.id || !seatStatusId) return null;

    const validationSchema = Yup.object().shape({
        seatStatusId: Yup.number().required("*حالة المقعد مطلوبة"),
    });

    async function handleSubmit(values: {
        seatStatusId: number;
    }) {
        try {
            const request: PatchRequest[] = [];
            if (values.seatStatusId !== seatStatusId)
                request.push({
                    op: "replace",
                    path: "seatStatusId",
                    value: values.seatStatusId.toString(),
                });

            if (request.length === 0) {
                toast.info("ليست هنالك أية تغييرات.");
                return;
            }
            const apiResponse = (
                await apiClient.patch<ApiResponse>(
                    `/API/UserReservationSeat/${params.id}`,
                    request
                )
            ).data;

            if (apiResponse.isSuccess) {
                if (apiResponse.message) toast.success(apiResponse.message);
                navigate(-1);
            } else apiResponse.errors?.forEach((error) => toast.error(error));
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
                    alignItems: "center",
                    direction: "rtl",
                }}
            >
                <Header title="تعديل حالة مقعد" subTitle="" />
                <Formik
                    initialValues={{
                        seatStatusId: seatStatusId,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="seat-status-label">
                                            حالة المقعد
                                        </InputLabel>
                                        <Select
                                            labelId="seat-status-label"
                                            id="seatStatusId"
                                            name="seatStatusId"
                                            value={values.seatStatusId}
                                            onChange={handleChange}
                                            label="حالة المقعد"
                                            error={
                                                touched.seatStatusId &&
                                                Boolean(errors.seatStatusId)
                                            }
                                        >
                                            {state.map((seatStatus) => (
                                                <MenuItem
                                                    key={seatStatus.id}
                                                    value={seatStatus.id.toString()}
                                                >
                                                    {`${seatStatus.statusName}`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <ErrorMessage
                                            name="seatStatusId"
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
                                تعديل
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}