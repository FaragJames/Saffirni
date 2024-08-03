import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { apiClient } from "../../../../utilities/Axios";
import { ApiResponse } from "../../../../utilities/Types";
import { toast } from "react-toastify";
import { EmployeeContext } from "../../../../utilities/Contexts/EmployeeContext";
import { AddBusInfo } from "./BusSectionTypes";
import BusForm from "./BusForm";

export default function AddBus() {
    const context = useContext(EmployeeContext);
    const navigate = useNavigate();


    async function handleSubmit(values: AddBusInfo) {
        try {
            const apiResponse = (
                await apiClient.post<ApiResponse>("/API/Bus/AddDashboard", {
                    busTypeId: parseInt(values.busTypeId),
                    busStatusId: parseInt(values.busStatusId),
                    plateNumber: values.plateNumber,
                    modelYear: values.modelYear,
                    companyId: context.state.companyId as number,
                })
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
        <BusForm
            handleSubmit={handleSubmit}
            editValues={undefined}
            headerLabel="إضافة حافلة جديدة"
            buttonLabel="إضافة"
        />
    );
}