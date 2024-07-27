import { createContext, Dispatch } from "react";

export class Employee {
    public constructor(
        public id: number | undefined = undefined,
        public companyId: number | undefined = undefined,
        public accountId: string | undefined = undefined,
        public firstName: string | undefined = undefined,
        public lastName: string | undefined = undefined,
        public phoneNumber: string | undefined = undefined
    ) {}
}

type EmployeeAction = {
    type: "reset" | "assign";
    payload: Employee;
};
export const employeeReducer = (state: Employee, action: EmployeeAction) => {
    switch (action.type) {
        case "reset":
            return new Employee();
        case "assign":
            return action.payload;
        default:
            throw new Error();
    }
};

export type EmployeeContextProps = {
    state: Employee;
    dispatcher: Dispatch<EmployeeAction> | undefined;
};
export const EmployeeContext = createContext<EmployeeContextProps>({
    state: new Employee(),
    dispatcher: undefined
});