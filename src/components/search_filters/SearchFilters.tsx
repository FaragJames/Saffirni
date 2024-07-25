import React from "react";
import {
    Box,
    Container,
    CssBaseline,
    FormControl,
    InputLabel,
    MenuItem,
    Rating,
    Select,
    Slider,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { apiClient } from "../../utilities/Axios";
import { GenericApiResponse } from "../../utilities/Types";
import { toast } from "react-toastify";
import { FilteredCompanyTrips } from "../../utilities/Types";

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
    rating: React.MutableRefObject<number>;
    fullCompanyTrips: FilteredCompanyTrips[] | null;
    setFilteredCompanyTrips: React.Dispatch<
        React.SetStateAction<FilteredCompanyTrips[] | null>
    >;
}) {
    const [busTypes, setBusTypes] = useState<Array<BusType>>();
    const [companies, setCompanies] = useState<Array<Company>>();

    function refilterCompanyTrips() {
        props.setFilteredCompanyTrips(
            props.fullCompanyTrips?.filter((value) => {
                let predicate =
                    value.ticketPrice <= props.maxPrice.current &&
                    value.companyRating >= props.rating.current;
                if (props.companyId.current != 0)
                    predicate &&=
                        value.companyName ==
                            companies?.find(
                                (c) => c.id === props.companyId.current
                            )?.name;
                if (props.busTypeId.current != 0)
                    predicate &&=
                        value.busType ==
                            busTypes?.find(
                                (b) => b.id === props.busTypeId.current
                            )?.typeName;

                return predicate;
            }) ?? null
        );
    }
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
        <Container component="main">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 1,
                    marginBottom: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    justifyContent: "flex-end",
                }}
            >
                <Box
                    component="form"
                    sx={{
                        mt: 3,
                        width: "15rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                        justifyContent: "end",
                    }}
                >
                    <FormControl fullWidth sx={{ mb: 2, maxWidth: "15rem" }}>
                        <InputLabel id="company-name-label">
                            اسم شركة النقل
                        </InputLabel>
                        <Select
                            labelId="company-name-label"
                            id="company-name"
                            label="Name of Company"
                            defaultValue={0}
                            onChange={(e) => {
                                props.companyId.current = e.target
                                    .value as number;
                                refilterCompanyTrips();
                            }}
                        >
                            <MenuItem value={0} key={0}>
                                كل الشركات
                            </MenuItem>
                            {companies?.map((company) => (
                                <MenuItem value={company.id} key={company.id}>
                                    {company.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2, maxWidth: "15rem" }}>
                        <InputLabel id="trip-type-label">نوع الرحلة</InputLabel>
                        <Select
                            labelId="trip-type-label"
                            id="trip-type"
                            label="Type of Trip"
                            defaultValue={0}
                            onChange={(e) => {
                                props.busTypeId.current = e.target
                                    .value as number;
                                refilterCompanyTrips();
                            }}
                        >
                            <MenuItem value={0} key={0}>
                                كل أنواع الرحلات
                            </MenuItem>
                            {busTypes?.map((busType) => (
                                <MenuItem value={busType.id} key={busType.id}>
                                    {busType.typeName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography gutterBottom>سعر بطاقة الرحلة</Typography>
                    <Slider
                        sx={{ mb: 2, maxWidth: "15rem" }}
                        valueLabelDisplay="auto"
                        min={10000}
                        max={100000}
                        defaultValue={100000}
                        step={1000}
                        onChange={(e, value) => {
                            props.maxPrice.current = value as number;
                            refilterCompanyTrips();
                        }}
                    />
                    <Typography gutterBottom> تقييم شركة النقل</Typography>

                    <Rating
                        sx={{ direction: "ltr" }}
                        name="simple-controlled"
                        defaultValue={0}
                        onChange={(e, value) => {
                            props.rating.current = value as number;
                            refilterCompanyTrips();
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
}
