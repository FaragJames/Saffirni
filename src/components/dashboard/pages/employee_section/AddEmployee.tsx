import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EmployeeContext } from "../../../../utilities/Contexts/EmployeeContext";
import { apiClient } from "../../../../utilities/Axios";
import { ApiResponse } from "../../../../utilities/Types";
import { toast } from "react-toastify";
import { EmployeeInfo } from "./EmployeeSectionTypes";
import EmployeeForm from "./EmployeeForm";

export default function AddEmployee() {
    const context = useContext(EmployeeContext);
    const navigate = useNavigate();

    async function handleSubmit(values: EmployeeInfo) {
        try {
            const apiResponse = (
                await apiClient.post<ApiResponse>("/Security/Account/SignUp/Employee", {
                    employee: {
                        companyId: context.state.companyId,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        phoneNumber: values.phoneNumber,
                    },
                    email: values.email,
                    password: values.password
                })
            ).data;

            if(apiResponse.isSuccess) {
                if(apiResponse.message)
                    toast.success(apiResponse.message);

                navigate("/Company/Dashboard/Employees");
            }
            else
                apiResponse.errors?.forEach(error => toast.error(error))
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <EmployeeForm handleSubmit={handleSubmit} buttonLabel="إضافة" />
    );
}