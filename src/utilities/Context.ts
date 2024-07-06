import { createContext, Dispatch } from "react";

export class User {
    public constructor(
        public id: number | undefined = undefined,
        public nationalId: string | undefined = undefined,
        public accountId: string | undefined = undefined,
        public firstName: string | undefined = undefined,
        public fatherName: string | undefined = undefined,
        public lastName: string | undefined = undefined,
        public phoneNumber: string | undefined = undefined
    ) {}
}
type Action = {
    type: "reset" | "assign";
    payload: User;
};
export const reducer = (state: User, action: Action) => {
    switch (action.type) {
        case "reset":
            return new User();
        case "assign":
            return action.payload;
        default:
            throw new Error();
    }
};
export type ContextProps = {
    state: User;
    dispatcher: Dispatch<Action> | undefined;
};
export const DataContext = createContext<ContextProps>({
    state: new User(),
    dispatcher: undefined,
});