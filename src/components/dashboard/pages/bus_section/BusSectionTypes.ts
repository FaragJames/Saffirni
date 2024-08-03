export type BusStatus = {
    statusName: string;
    id: number;
};
export type BusType = {
    id: number;
    typeName: string;
    numberOfSeats: number;
};
export type Bus = {
    id: number;
    companyId: number;
    plateNumber: number;
    modelYear: number;
    busType: BusType;
    busStatus: BusStatus;
};

export type BusInfo = {
    id: number;
    plateNumber: number;
    modelYear: number;
    statusName: string;
    typeName: string;
    numberOfSeats: number;
};

export type AddBusInfo = {
    busTypeId: string;
    busStatusId: string;
    plateNumber: number;
    modelYear: number;
};