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

class TravelerData {
    public constructor(
        public firstName: string = "",
        public fatherName: string = "",
        public lastName: string = "",
        public nationalId: string = "",
        public phoneNumber: string = "",
    ) {}
}
type TravelerDataShape = {
    [P in keyof TravelerData]: Yup.StringSchema<string>;
};
export type BillItem = {
    travelerData: TravelerData;
    seatId: number;
    seatNumber: number;
    createUser: boolean;
}

export default function TravelerInfo() {
    const navigate = useNavigate();
    const locationState = useLocation().state;
    const locationData = locationState ? locationState as TemporaryReservationResponse : null;

    let seatIdToSeatNumber: Map<number, number> | undefined = undefined;
    if(locationData)
        seatIdToSeatNumber = new Map(
            Object.entries(locationData.seatIdToSeatNumber).map(([k, v]) => [
                parseInt(k),
                parseInt(v)
            ])
        );

    const [readonlyNationalIdState, setReadonlyNationalIdState] = useState<Array<boolean>>(
        new Array<boolean>(seatIdToSeatNumber?.size ?? 0).fill(false)
    );
    const [foundUsersState, setFoundUsersState] = useState<Array<boolean>>(
        new Array<boolean>(seatIdToSeatNumber?.size ?? 0).fill(true)
    );
    const [loaderState, setLoaderState] = useState<boolean>(false);

    const seatsIds: number[] = [],
        seatsNumber: number[] = [];
    if(seatIdToSeatNumber)
        for (const [key, value] of seatIdToSeatNumber) {
            seatsIds.push(key);
            seatsNumber.push(value);
        }

    const validationShape: TravelerDataShape = {
        firstName: Yup.string().required("*الاسم الأول مطلوب"),
        lastName: Yup.string().required("*الكنية مطلوبة"),
        fatherName: Yup.string().required("*اسم الأب مطلوب"),
        nationalId: Yup.string()
            .matches(/^\d{11}$/, "*الرقم الوطني يجب أن يتكون من 11 رقم")
            .required("*الرقم الوطني مطلوب"),
        phoneNumber: Yup.string()
            .matches(
                /^09[3,4,5,6,8,9]\d{7}$/,
                "*رقم الجوال يجب أن يبدأ ب09 ويتكون من 10 أرقام"
            )
            .required("*رقم الموبايل مطلوب"),
    };
    const validationSchema = Yup.array().of(
        Yup.object().shape(validationShape)
    );
    const formik = useFormik<TravelerData[]>({
        initialValues: Array.from(
            { length: seatIdToSeatNumber?.size ?? 0 },
            () => new TravelerData()
        ),
        validationSchema,
        onSubmit: (values) => {
            const billItems: BillItem[] = values.map<BillItem>((value, index) => {
                return {
                    travelerData: value,
                    seatId: seatsIds[index],
                    seatNumber: seatsNumber[index],
                    createUser: !foundUsersState[index]
                }
            });
            navigate("/Trip/Bill", { state: { billItems: billItems, reservationId: locationData?.reservationId }})
        },
    });

    if(!locationData)
        return;

    async function handleOnBlur(
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
        index: number
    ) {
        if (
            confirm(`هل أنت متأكد من الرقم الوطني ${e.currentTarget.value} ؟`)
        ) {
            try {
                setLoaderState(true);
                const response = await apiClient.post<
                    GenericApiResponse<TravelerData>
                >("/API/User/ContainsUser?fullInfo=true", {
                    nationalId: e.currentTarget.value,
                });
                const apiResponse = response.data;

                if(apiResponse.isSuccess) {
                    toast.success("تم العثور على المستخدم ذو الرقم الوطني المدخل.")
                    formik.values[index] = apiResponse.payload as TravelerData;

                    const tmpReadonlyId = [...readonlyNationalIdState];
                    tmpReadonlyId[index] = true;
                    setReadonlyNationalIdState(tmpReadonlyId);
                }
                else if (response.status === 404) {
                    toast.info("لم يتم العثور على المستخدم! الرجاء إدخال المعلومات اللازمة.")

                    const tmpReadonlyId = [...readonlyNationalIdState];
                    tmpReadonlyId[index] = true;
                    setReadonlyNationalIdState(tmpReadonlyId);

                    const tmpFoundUsers = [...foundUsersState];
                    tmpFoundUsers[index] = false;
                    setFoundUsersState(tmpFoundUsers);
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
    function handleClearInputs() {
        formik.resetForm()
        setReadonlyNationalIdState(
            new Array<boolean>(seatIdToSeatNumber?.size ?? 0).fill(false)
        );
        setFoundUsersState(
            new Array<boolean>(seatIdToSeatNumber?.size ?? 0).fill(true)
        );
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
                                        if (
                                            !formik.errors[index]?.nationalId &&
                                            e.currentTarget.value
                                        )
                                            handleOnBlur(e, index);
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
                                {!foundUsersState[index] && (
                                    <>
                                        <TextField
                                            required
                                            name={`${index}.firstName`}
                                            label="الاسم الأول"
                                            value={
                                                formik.values[index].firstName
                                            }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched[index]
                                                    ?.firstName &&
                                                Boolean(
                                                    formik.errors[index]
                                                        ?.firstName
                                                )
                                            }
                                            helperText={
                                                formik.touched[index]
                                                    ?.firstName &&
                                                formik.errors[index]?.firstName
                                            }
                                        />

                                        <TextField
                                            required
                                            name={`${index}.lastName`}
                                            label="الكنية"
                                            value={
                                                formik.values[index].lastName
                                            }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched[index]
                                                    ?.lastName &&
                                                Boolean(
                                                    formik.errors[index]
                                                        ?.lastName
                                                )
                                            }
                                            helperText={
                                                formik.touched[index]
                                                    ?.lastName &&
                                                formik.errors[index]?.lastName
                                            }
                                        />

                                        <TextField
                                            required
                                            name={`${index}.fatherName`}
                                            label="اسم الأب"
                                            value={
                                                formik.values[index].fatherName
                                            }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched[index]
                                                    ?.fatherName &&
                                                Boolean(
                                                    formik.errors[index]
                                                        ?.fatherName
                                                )
                                            }
                                            helperText={
                                                formik.touched[index]
                                                    ?.fatherName &&
                                                formik.errors[index]?.fatherName
                                            }
                                        />

                                        <TextField
                                            required
                                            name={`${index}.phoneNumber`}
                                            label="رقم الموبايل"
                                            value={
                                                formik.values[index].phoneNumber
                                            }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched[index]
                                                    ?.phoneNumber &&
                                                Boolean(
                                                    formik.errors[index]
                                                        ?.phoneNumber
                                                )
                                            }
                                            helperText={
                                                formik.touched[index]
                                                    ?.phoneNumber &&
                                                formik.errors[index]
                                                    ?.phoneNumber
                                            }
                                        />
                                    </>
                                )}
                            </Box>
                            <br />
                        </div>
                    ))}

                    <div className="buttonContainer">
                        <button className="btnR btn" onClick={handleClearInputs}>مسح البيانات</button>
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
