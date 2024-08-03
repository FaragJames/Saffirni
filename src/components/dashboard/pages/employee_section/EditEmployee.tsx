import { toast } from "react-toastify";
import { apiClient } from "../../../../utilities/Axios";
import { ApiResponse } from "../../../../utilities/Types";
import EmployeeForm from "./EmployeeForm";
import { EmployeeInfo } from "./EmployeeSectionTypes";

export default function EditEmployee() {
    const context = useContext(EmployeeContext);
    const navigate = useNavigate();

    async function handleSubmit(values: EmployeeInfo) {
        try {
            const apiResponse = (
                await apiClient.post<ApiResponse>(
                    "????",
                    {
                        employee: {
                            companyId: context.state.companyId,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            phoneNumber: values.phoneNumber,
                        },
                        email: values.email,
                        password: values.password,
                    }
                )
            ).data;

            if (apiResponse.isSuccess) {
                if (apiResponse.message) toast.success(apiResponse.message);

                navigate("/Company/Dashboard/Employees");
            } else apiResponse.errors?.forEach((error) => toast.error(error));
        } catch (error) {
            console.error(error);
        }
    }

    return <EmployeeForm handleSubmit={handleSubmit} buttonLabel="تعديل" />;
}
