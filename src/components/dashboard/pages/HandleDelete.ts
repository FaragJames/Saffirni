import { toast } from "react-toastify";
import { apiClient } from "../../../utilities/Axios";
import { ApiResponse } from "../../../utilities/Types";

export async function handleDelete(url: string) {
    if (confirm("هل أنت متأكد من حذف العنصر؟")) {
        const apiResponse = (await apiClient.delete<ApiResponse>(url)).data;
        if (apiResponse.isSuccess) {
            if (apiResponse.message) toast.success(apiResponse.message);
        } else apiResponse.errors?.forEach((error) => toast.error(error));
    }
}