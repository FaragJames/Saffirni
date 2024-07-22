import {
    Box,
    Container,
    CssBaseline,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Typography,
    Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { apiClient } from "../../utilities/Axios";
import { GenericApiResponse } from "../../utilities/Types";
import { toast } from "react-toastify";

type BusType = {
    id: number;
    typeName: string;
};

type Company = {
    id: number;
    name: string;
};

export default function SearchFilters(props: {
    busTypeId: React.MutableRefObject<number>;
    companyId: React.MutableRefObject<number>;
    maxPrice: React.MutableRefObject<number>;
}) {
    const [busTypes, setBusTypes] = useState<Array<BusType>>();
    const [companies, setCompanies] = useState<Array<Company>>();

    useEffect(() => {
        async function fetchBusTypes() {
            try {
                const apiResponse = (
                    await apiClient.get<GenericApiResponse<Array<BusType>>>(
                        "/API/BusType"
                    )
                ).data;

                if (apiResponse.isSuccess && apiResponse.payload) {
                    if (apiResponse.message) toast.success(apiResponse.message);

                    setBusTypes(apiResponse.payload);
                    return;
                }

                apiResponse.errors?.forEach((error) => toast.error(error));
            } catch (error) {
                console.error(error);
            }
        }
        async function fetchCompanies() {
            try {
                const apiResponse = (
                    await apiClient.get<GenericApiResponse<Array<Company>>>(
                        "/API/Company?fullInfo=false"
                    )
                ).data;

                if (apiResponse.isSuccess && apiResponse.payload) {
                    if (apiResponse.message) toast.success(apiResponse.message);

                    setCompanies(apiResponse.payload);
                    return;
                }

                apiResponse.errors?.forEach((error) => toast.error(error));
            } catch (error) {
                console.error(error);
            }
        }
        fetchBusTypes();
        fetchCompanies();
    }, []);

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 1,
                    marginBottom: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box component="form" sx={{ mt: 6, width: "100%" }}>
                    <Grid container spacing={2} alignItems="center" gap={3}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="company-name-label">
                                    اسم شركة النقل
                                </InputLabel>
                                <Select
                                    defaultValue={0}
                                    labelId="company-name-label"
                                    id="company-name"
                                    label="Name of Company"
                                    onChange={(e) => {
                                        props.companyId.current = e.target
                                            .value as number;
                                    }}
                                >
                                    <MenuItem value={0} key={0}>
                                        كل الشركات
                                    </MenuItem>
                                    {companies?.map((company) => (
                                        <MenuItem
                                            value={company.id}
                                            key={company.id}
                                        >
                                            {company.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="trip-type-label">
                                    نوع الرحلة
                                </InputLabel>
                                <Select
                                    defaultValue={0}
                                    labelId="trip-type-label"
                                    id="trip-type"
                                    label="Type of Trip"
                                    onChange={(e) => {
                                        props.busTypeId.current = e.target
                                            .value as number;
                                    }}
                                >
                                    <MenuItem value={0} key={0}>
                                        كل أنواع الرحلات
                                    </MenuItem>
                                    {busTypes?.map((busType) => (
                                        <MenuItem
                                            value={busType.id}
                                            key={busType.id}
                                        >
                                            {busType.typeName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography gutterBottom>
                                سعر بطاقة الرحلة
                            </Typography>
                            <Slider
                                valueLabelDisplay="auto"
                                min={0}
                                max={150000}
                                defaultValue={150000}
                                onChange={(e, value) => {
                                    props.maxPrice.current = value as number;
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
