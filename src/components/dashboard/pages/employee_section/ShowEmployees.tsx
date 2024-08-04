import Header from "../../dashboard_components/Header";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { apiClient } from "../../../../utilities/Axios";
import { ApiResponse, GenericApiResponse } from "../../../../utilities/Types";
import { toast } from "react-toastify";
import { DashboardEmployeeInfo } from "./EmployeeSectionTypes";
import { handleDelete } from "../HandleDelete";
import { TbLocationCog } from "react-icons/tb";

export default function ShowEmployees() {
  const navigate = useNavigate();
  const [employeesState, setEmployeesState] = useState<DashboardEmployeeInfo[]>(
    []
  );
  useEffect(() => {
    async function fetchData() {
      try {
        const apiResponse = (
          await apiClient.get<GenericApiResponse<DashboardEmployeeInfo[]>>(
            "/API/Employee/GetAllDashboard"
          )
        ).data;

        if (apiResponse.isSuccess && apiResponse.payload)
          setEmployeesState(apiResponse.payload);
        else apiResponse.errors?.forEach((error) => toast.error(error));
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 90, editable: false },
    {
      field: "firstName",
      headerName: "الاسم الأول",
      width: 150,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "الكنية",
      width: 150,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "رقم الموبايل",
      width: 200,
      editable: false,
    },
    {
      field: "email",
      headerName: "البريد الإلكتروني",
      width: 250,
      editable: false,
    },
    {
      field: "accountId",
      headerName: "رقم الحساب",
      width: 250,
      editable: false,
    },
    // {
    //     field: "ُEditEmployee",
    //     headerName: "تعديل موظف",
    //     width: 150,
    //     renderCell: (params) => (
    //         <Button
    //             variant="contained"
    //             color="success"
    //             onClick={() =>
    //                 navigate(
    //                     `/Company/Dashboard/EditEmployee/${params.row.id}`
    //                 )
    //             }
    //         >
    //             تعديل{" "}
    //         </Button>
    //     ),
    // },
    {
      field: "DeleteEmployee",
      headerName: "حذف موظف",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(`/Api/Employee/${params.row.id}`)}
        >
          حذف{" "}
        </Button>
      ),
    },
    {
      field: "Upgrage",
      headerName: "ترقية موظف",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleUpgrade(params.row.accountId)}
        >
          ترقية كاملة{" "}
        </Button>
      ),
    },
  ];

  async function handleUpgrade(accountId: string | undefined | null) {
    if (!accountId) {
      toast.error("لا يمكن ترقية هذا الموظف!");
      return;
    }
    try {
      const apiResponse = (
        await apiClient.post<ApiResponse>(
          `/Security/Claims/UpgradeEmployeeToCompanyAdmin/${accountId}`
        )
      ).data;
      if (apiResponse.isSuccess) {
        if (apiResponse.message) toast.success(apiResponse.message);
      } else apiResponse.errors?.forEach((error) => toast.error(error));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header title="معلومات موظفين الشركة" subTitle="" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/Company/Dashboard/AddEmployee")}
        style={{
          marginBottom: "2rem",
          marginTop: "0.2rem",
          direction: "rtl",
        }}
      >
        <span>إضافة موظف جديد</span>
      </Button>

      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={employeesState}
          columns={columns}
          sx={{ width: "1250px", overflowX: "auto" }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
