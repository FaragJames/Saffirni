import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiClient } from "../../../../utilities/Axios";
import {
    ApiResponse,
    EditRouteParams,
    GenericApiResponse,
    PatchRequest,
} from "../../../../utilities/Types";
import BusForm from "./BusForm";
import { AddBusInfo, Bus } from "./BusSectionTypes";

export default function EditBus() {
    const params = useParams<EditRouteParams>();
    const navigate = useNavigate();
    const [busState, setBusState] = useState<AddBusInfo>();

    useEffect(() => {
        async function fetchData() {
            try {
                const apiResponse = (
                    await apiClient.get<GenericApiResponse<Bus>>(
                        `/API/Bus/${params.id}`
                    )
                ).data;

                if (apiResponse.isSuccess && apiResponse.payload) {
                    setBusState({
                        plateNumber: apiResponse.payload.plateNumber,
                        modelYear: apiResponse.payload.modelYear,
                        busStatusId:
                            apiResponse.payload.busStatus.id.toString(),
                        busTypeId: apiResponse.payload.busType.id.toString(),
                    });
                } else
                    apiResponse.errors?.forEach((error) => toast.error(error));
            } catch (error) {
                console.error(error);
            }
        }

        if (!params.id) navigate(-1);
        else fetchData();
    }, []);

    if (!params.id) return;

    async function handleSubmit(values: AddBusInfo) {
        try {
            const request: PatchRequest[] = [];
            if (values.busStatusId !== busState?.busStatusId)
                request.push({
                    op: "replace",
                    path: "busStatusId",
                    value: values.busStatusId,
                });
            if (values.busTypeId !== busState?.busTypeId)
                request.push({
                    op: "replace",
                    path: "busTypeId",
                    value: values.busTypeId,
                });
            if (values.modelYear !== busState?.modelYear)
                request.push({
                    op: "replace",
                    path: "modelYear",
                    value: values.modelYear.toString(),
                });
            if (values.plateNumber !== busState?.plateNumber)
                request.push({
                    op: "replace",
                    path: "plateNumber",
                    value: values.plateNumber.toString(),
                });

            const apiResponse = (
                await apiClient.patch<ApiResponse>(
                    `/API/Bus/${params.id}`,
                    request
                )
            ).data;

            if (apiResponse.isSuccess) {
                if (apiResponse.message) toast.success(apiResponse.message);
                navigate("/Company/Dashboard/Buses");
            } else apiResponse.errors?.forEach((error) => toast.error(error));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <BusForm
                handleSubmit={handleSubmit}
                editValues={busState}
                headerLabel="تعديل باص"
                buttonLabel="تعديل"
            />
        </>
    );
}
