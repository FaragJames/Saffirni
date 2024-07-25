import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import "./TravelerInfo.css";
import { TemporaryReservationResponse } from "../seat_selection/SeatSelection";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { apiClient } from "../../utilities/Axios";
import { GenericApiResponse } from "../../utilities/Types";
import { toast } from "react-toastify";

class TravelerInfoData {
    public constructor(
        public firstName: string = "",
        public fatherName: string = "",
        public lastName: string = "",
        public nationalId: string = "",
        public phoneNumber: string = ""
    ) {}
}
type TravelerInfoDataShape = {
    [P in keyof TravelerInfoData]: Yup.StringSchema<string>;
};

export default function TravelerInfo() {
    const navigate = useNavigate();
    const locationState = useLocation().state;
    const locationData = locationState as TemporaryReservationResponse;
    const seatIdToSeatNumber = new Map(
        Object.entries(locationData.seatIdToSeatNumber).map(([k, v]) => [
            parseInt(k),
            parseInt(v),
        ])
    );

    const [readonlyNationalIdState, setReadonlyNationalIdState] = useState<Array<boolean>>(
        new Array<boolean>(seatIdToSeatNumber.size).fill(false)
    );
    const [readonlyFieldsState, setReadonlyFieldsState] = useState<
        Array<boolean>
    >(new Array<boolean>(seatIdToSeatNumber.size).fill(true));
    const [loaderState, setLoaderState] = useState<boolean>(false);

    const seatsIds: number[] = [],
        seatsNumber: number[] = [];
    for (const [key, value] of seatIdToSeatNumber) {
        seatsIds.push(key);
        seatsNumber.push(value);
    }

    const validationShape: TravelerInfoDataShape = {
        firstName: Yup.string().required("*الاسم الأول مطلوب"),
        lastName: Yup.string().required("*الكنية مطلوبة"),
        fatherName: Yup.string().required("*اسم الأب مطلوب"),
        nationalId: Yup.string()
            .matches(/^\d{11}$/, "*الرقم الوطني يجب أن يتكون من 11 رقم")
            .required("*الرقم الوطني مطلوب"),
        phoneNumber: Yup.string()
            .matches(
                /^09[3,4,5,6,7,8,9]\d{7}$/,
                "*رقم الجوال يجب أن يبدأ ب09 ويتكون من 10 أرقام"
            )
            .required("*رقم الموبايل مطلوب"),
    };
    const validationSchema = Yup.array().of(
        Yup.object().shape(validationShape)
    );
    const formik = useFormik<TravelerInfoData[]>({
        initialValues: Array.from(
            { length: seatIdToSeatNumber.size },
            () => new TravelerInfoData()
        ),
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
            alert("Success")
        },
    });

    async function handleonBlur(
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
        index: number
    ) {
        if (formik.errors[index]?.nationalId) return;
        if (
            confirm(`هل أنت متأكد من الرقم الوطني ${e.currentTarget.value} ؟`)
        ) {
            try {
                setLoaderState(true);
                const response = await apiClient.post<GenericApiResponse<TravelerInfoData>>(
                    "/API/User/ContainsUser",
                    {
                        nationalId: e.currentTarget.value,
                    }
                );
                const apiResponse = response.data;

                if(apiResponse.isSuccess) {
                    formik.values[index] = apiResponse.payload as TravelerInfoData;

                    const tmpReadonlyId = [...readonlyNationalIdState];
                    tmpReadonlyId[index] = true;
                    setReadonlyNationalIdState(tmpReadonlyId);

                    const tmpReadonlyFields = [...readonlyFieldsState];
                    tmpReadonlyFields[index] = true;
                    setReadonlyFieldsState(tmpReadonlyFields);
                }
                else if (response.status === 404) {
                    const tmpReadonlyId = [...readonlyNationalIdState];
                    tmpReadonlyId[index] = true;
                    setReadonlyNationalIdState(tmpReadonlyId);

                    const tmpReadonlyFields = [...readonlyFieldsState];
                    tmpReadonlyFields[index] = false;
                    setReadonlyFieldsState(tmpReadonlyFields);
                }
                else 
                    apiResponse.errors?.forEach((error) => toast.error(error));
            } catch (error) {
                console.error(error);
            } finally {
                setLoaderState(false);
            }
        }
    }

    return (
        <div>
            <div className="TravelerInfo">
                <h2 className="title">معلومات المسافرين</h2>
                <form onSubmit={formik.handleSubmit}>
                    {seatsNumber.map((value, index) => (
                        <div key={seatsIds[index]} className="form">
                            <h3 className="sectitel">كرسي رقم {value}</h3>
                            <Box
                                sx={{
                                    "& .MuiTextField-root": {
                                        m: 1,
                                        width: "25ch",
                                    },
                                }}
                            >
                                <TextField
                                    disabled={readonlyNationalIdState[index]}
                                    required
                                    name={`${index}.nationalId`}
                                    label="الرقم الوطني"
                                    value={formik.values[index].nationalId}
                                    onChange={formik.handleChange}
                                    onBlur={(e) => {
                                        formik.handleBlur(e);
                                        handleonBlur(e, index);
                                    }}
                                    error={
                                        formik.touched[index]?.nationalId &&
                                        Boolean(
                                            formik.errors[index]?.nationalId
                                        )
                                    }
                                    helperText={
                                        formik.touched[index]?.nationalId &&
                                        formik.errors[index]?.nationalId
                                    }
                                />
                                <TextField
                                    disabled={readonlyFieldsState[index]}
                                    required
                                    name={`${index}.firstName`}
                                    label="الاسم الأول"
                                    value={formik.values[index].firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched[index]?.firstName &&
                                        Boolean(formik.errors[index]?.firstName)
                                    }
                                    helperText={
                                        formik.touched[index]?.firstName &&
                                        formik.errors[index]?.firstName
                                    }
                                />

                                <TextField
                                    disabled={readonlyFieldsState[index]}
                                    required
                                    name={`${index}.lastName`}
                                    label="الكنية"
                                    value={formik.values[index].lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched[index]?.lastName &&
                                        Boolean(formik.errors[index]?.lastName)
                                    }
                                    helperText={
                                        formik.touched[index]?.lastName &&
                                        formik.errors[index]?.lastName
                                    }
                                />

                                <TextField
                                    disabled={readonlyFieldsState[index]}
                                    required
                                    name={`${index}.fatherName`}
                                    label="اسم الأب"
                                    value={formik.values[index].fatherName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched[index]?.fatherName &&
                                        Boolean(
                                            formik.errors[index]?.fatherName
                                        )
                                    }
                                    helperText={
                                        formik.touched[index]?.fatherName &&
                                        formik.errors[index]?.fatherName
                                    }
                                />

                                <TextField
                                    disabled={readonlyFieldsState[index]}
                                    required
                                    name={`${index}.phoneNumber`}
                                    label="رقم الموبايل"
                                    value={formik.values[index].phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched[index]?.phoneNumber &&
                                        Boolean(
                                            formik.errors[index]?.phoneNumber
                                        )
                                    }
                                    helperText={
                                        formik.touched[index]?.phoneNumber &&
                                        formik.errors[index]?.phoneNumber
                                    }
                                />
                            </Box>
                            <br />
                        </div>
                    ))}

                    <div className="buttonContainer">
                        <button
                            type="submit"
                            className="btn"
                            style={{
                                border: "none",
                                color: "#fff",
                                marginBottom: "3rem",
                                marginTop: "1rem",
                            }}
                        >
                            التالي
                        </button>
                    </div>
                </form>
            </div>
            {loaderState && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 100,
                    }}
                >
                    <CircularProgress />
                </div>
            )}
        </div>
    );
}
