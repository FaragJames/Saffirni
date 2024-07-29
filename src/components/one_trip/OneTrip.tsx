import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OneTrip.css";
import img from "../../assets/img.jpg";
import Rating from "@mui/material/Rating";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import { UserReservation } from "../my_trips/MyTrips";
import { apiClient } from "../../utilities/Axios";
import {
    ApiResponse,
    FilteredCompanyTrips,
    GenericApiResponse,
    TemporaryReservationResponse,
} from "../../utilities/Types";
import { toast } from "react-toastify";
import toArabicDateTime from "../../utilities/ArabicDateTime";

type ReservationInfo = {
    reservationOwner: string;
    paymentMethod: string;
    reservationSource: string;
    seatsCount: number;
    seatNumberToUserName: Map<number, string>;
};

enum DialogType {
    Buttons,
    TripDetails,
    ReservationDetails,
    SetReview,
    CancelReservation,
}

export default function OneTrip({
    userReservation,
    isCurrentReservationsRef,
    setUserReservationsState,
}: {
    userReservation: UserReservation;
    isCurrentReservationsRef: React.MutableRefObject<boolean>;
    setUserReservationsState: React.Dispatch<
        React.SetStateAction<UserReservation[] | undefined>
    >;
}) {
    const [anchorEl, setAnchorEl] = useState<
        (EventTarget & HTMLButtonElement) | null
    >(null);
    const [dialogContent, setDialogContent] = useState(DialogType.Buttons);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const handleCompleteReservation = async () => {
        try {
            const apiResponse = (
                await apiClient.get<
                    GenericApiResponse<TemporaryReservationResponse>
                >(
                    `/API/UserTripReservation/GetTemporaryReservationInfo/${userReservation.reservationId}`
                )
            ).data;
            
            if (apiResponse.isSuccess && apiResponse.payload) {
                navigate("/Trip/TravelerInfo", {
                    state: apiResponse.payload,
                });
            }
            else apiResponse.errors?.forEach((error) => toast.error(error));
        } catch (error) {
            console.error(error)
        }
    };

    const showDialog = (content: DialogType) => {
        setDialogContent(content);
        setOpen(true);
    };

    const tripInfoRef = useRef<FilteredCompanyTrips>();
    async function showTripInfo() {
        try {
            const apiResponse = (
                await apiClient.get<GenericApiResponse<FilteredCompanyTrips>>(
                    `/API/UserTripReservation/GetReservationTripInfo/${userReservation.reservationId}`
                )
            ).data;

            if (apiResponse.isSuccess && apiResponse.payload) {
                tripInfoRef.current = apiResponse.payload;
                showDialog(DialogType.TripDetails);
            }
            else {
                apiResponse.errors?.forEach((error) => toast.error(error));
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const reservationInfoRef = useRef<ReservationInfo>();
    async function showReservationInfo() {
        try {
            const apiResponse = (
                await apiClient.get<GenericApiResponse<ReservationInfo>>(
                    `/API/UserTripReservation/GetUserReservationInfo/${userReservation.reservationId}`
                )
            ).data;

            if (apiResponse.isSuccess && apiResponse.payload) {
                reservationInfoRef.current = apiResponse.payload;
                showDialog(DialogType.ReservationDetails);
            } else {
                apiResponse.errors?.forEach((error) => toast.error(error));
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const rating = useRef<number>(1);
    const comment = useRef<string | null>(null);
    async function handleTripRating() {
        try {
            const apiResponse = (
                await apiClient.post<ApiResponse>(
                    "/API/UserReservationSeat/RateTrip",
                    {
                        reservationId: userReservation.reservationId,
                        rating: rating.current,
                        comment: comment.current,
                    }
                )
            ).data;

            if (apiResponse.isSuccess) {
                if (apiResponse.message) toast.success(apiResponse.message);
            } else {
                apiResponse.errors?.forEach((error) => toast.error(error));
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDeleteClick() {
        try {
            const apiResponse = (
                await apiClient.delete<ApiResponse>(
                    `/API/UserTripReservation/${userReservation.reservationId}`
                )
            ).data;

            if (apiResponse.isSuccess) {
                if (apiResponse.message) toast.success(apiResponse.message);
                setUserReservationsState((u) =>
                    u?.filter(
                        (value) =>
                            value.reservationId !==
                            userReservation.reservationId
                    )
                );
            } else {
                apiResponse.errors?.forEach((error) => toast.error(error));
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="trip-result">
            <div className="Hresult">
                <p>رقم الحجز: {userReservation.reservationId}</p>
                <p>الوجهة: {userReservation.destination}</p>
                <p>
                    وقت الانطلاق المتوقع:{" "}
                    {toArabicDateTime(userReservation.expectedDepartTime)}
                </p>
            </div>
            <div className="imresalt">
                <div className="imageDiv">
                    <img src={img} alt="Trip" />
                </div>
                <div>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        {!userReservation.isReservationCompleted && (
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    handleCompleteReservation();
                                }}
                            >
                                استكمال الحجز
                            </MenuItem>
                        )}
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                showTripInfo();
                            }}
                        >
                            تفاصيل الرحلة
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                showReservationInfo();
                            }}
                        >
                            تفاصيل الحجز
                        </MenuItem>
                        {userReservation.isReviewable && (
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    showDialog(DialogType.SetReview);
                                }}
                            >
                                تقييم الرحلة
                            </MenuItem>
                        )}
                        {isCurrentReservationsRef.current && (
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    showDialog(DialogType.CancelReservation);
                                }}
                            >
                                إلغاء الحجز
                            </MenuItem>
                        )}
                    </Menu>
                </div>
                <div className="ratingDiv">
                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogContent>
                            {dialogContent === DialogType.TripDetails && (
                                <div>
                                    <Typography>تفاصيل الرحلة:</Typography>
                                    <p>
                                        اسم الشركة:{" "}
                                        {tripInfoRef.current?.companyName}
                                    </p>
                                    <p>
                                        نقطة الانطلاق:{" "}
                                        {tripInfoRef.current?.source}
                                    </p>
                                    <p>
                                        الوجهة:{" "}
                                        {tripInfoRef.current?.destination}
                                    </p>
                                    <p>
                                        موعد الانطلاق المتوقع:{" "}
                                        {toArabicDateTime(
                                            tripInfoRef.current
                                                ?.expectedDepartTime
                                        )}
                                    </p>
                                    <p>
                                        موعد الوصول المتوقع:{" "}
                                        {toArabicDateTime(
                                            tripInfoRef.current
                                                ?.expectedArrivalTime
                                        )}
                                    </p>
                                    {!isCurrentReservationsRef.current && (
                                        <>
                                            <p>
                                                موعد الانطلاق الفعلي:{" "}
                                                {toArabicDateTime(
                                                    tripInfoRef.current
                                                        ?.actualDepartTime
                                                )}
                                            </p>
                                            <p>
                                                موعد الوصول الفعلي:{" "}
                                                {toArabicDateTime(
                                                    tripInfoRef.current
                                                        ?.actualArrivalTime
                                                )}
                                            </p>
                                        </>
                                    )}
                                    <p>
                                        نوع الرحلة:{" "}
                                        {tripInfoRef.current?.busType}
                                    </p>
                                    <p>
                                        سعر التذكرة:{" "}
                                        {tripInfoRef.current?.ticketPrice}
                                    </p>
                                </div>
                            )}
                            {dialogContent ===
                                DialogType.ReservationDetails && (
                                <div>
                                    <Typography>تفاصيل الحجز:</Typography>
                                    <p>
                                        صاحب الحجز:{" "}
                                        {
                                            reservationInfoRef.current
                                                ?.reservationOwner
                                        }
                                    </p>
                                    <p>
                                        طريقة الدفع:{" "}
                                        {
                                            reservationInfoRef.current
                                                ?.paymentMethod
                                        }
                                    </p>
                                    <p>
                                        مصدر الحجز:{" "}
                                        {
                                            reservationInfoRef.current
                                                ?.reservationSource
                                        }
                                    </p>
                                    <p>
                                        عدد المقاعد المحجوزة:{" "}
                                        {reservationInfoRef.current?.seatsCount}
                                    </p>
                                    {Object.entries(
                                        reservationInfoRef.current
                                            ?.seatNumberToUserName as Map<
                                            number,
                                            string
                                        >
                                    ).map(([key, value]) => (
                                        <p key={key}>
                                            الاسم: {value} -- رقم المقعد: {key}
                                        </p>
                                    ))}
                                </div>
                            )}
                            {dialogContent === DialogType.SetReview && (
                                <div>
                                    <Typography>إضافة تعليق:</Typography>
                                    <TextField
                                        label="تعليق"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) =>
                                            (comment.current =
                                                e.currentTarget.value.length ==
                                                0
                                                    ? null
                                                    : e.currentTarget.value)
                                        }
                                    />
                                    <div
                                        style={{
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Rating
                                            sx={{ marginTop: "2rem" }}
                                            dir="ltr"
                                            name="trip-rating"
                                            defaultValue={rating.current}
                                            onChange={(_, newValue) => {
                                                rating.current = newValue
                                                    ? newValue
                                                    : 1;
                                            }}
                                            size="large"
                                        />
                                    </div>
                                    <button
                                        className="btn"
                                        style={{
                                            alignItems: "center",
                                            color: "var(--WhiteColor)",
                                            fontWeight: "700",
                                            margin: " 1rem 1.5rem",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                        onClick={handleTripRating}
                                    >
                                        إضافة
                                    </button>
                                </div>
                            )}
                            {dialogContent === DialogType.CancelReservation && (
                                <div>
                                    <Typography>
                                        هل أنت متأكد من إلغاء الحجز؟
                                    </Typography>
                                    <Button onClick={handleDeleteClick}>
                                        نعم
                                    </Button>
                                    <Button onClick={() => setOpen(false)}>
                                        لا
                                    </Button>
                                </div>
                            )}
                        </DialogContent>
                        {dialogContent !== DialogType.Buttons && (
                            <DialogActions>
                                <Button onClick={() => setOpen(false)}>
                                    إغلاق
                                </Button>
                            </DialogActions>
                        )}
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
