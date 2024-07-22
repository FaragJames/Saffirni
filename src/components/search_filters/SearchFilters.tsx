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
  const [value, setValue] = React.useState<number | null>(2);
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
            <InputLabel id="company-name-label">اسم شركة النقل</InputLabel>
            <Select
              labelId="company-name-label"
              id="company-name"
              label="Name of Company"
              onChange={(e) => {
                props.companyId.current = e.target.value as number;
              }}
            >
              <MenuItem value="0" key={0} selected>
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
              onChange={(e) => {
                props.busTypeId.current = e.target.value as number;
              }}
            >
              <MenuItem value="0" key={0} selected>
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
            min={0}
            max={150000}
            onChange={(e, value) => {
              props.maxPrice.current = value as number;
            }}
          />
     <Typography gutterBottom> تقييم شركة النقل</Typography>

          <Rating
          sx={{direction:"ltr"}}
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
