import { StringSchema } from "yup";

export type EmployeeInfo = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type EmployeeInfoShape = {
    [P in keyof EmployeeInfo]: StringSchema;
};

export type DashboardEmployeeInfo = {
    id: number;
    email?: string;
    accountId?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
};