export type CompanyBusStations = {
    busStationId: number;
    fullName: string;
};

export type CompanyTripInfo = {
    sourceBusStationId: string;
    destinationBusStationId: string;
    expectedDepartTime: string;
    expectedArrivalTime: string;
    actualDepartTime: string | null;
    actualArrivalTime: string | null;
    ticketPrice: number;
    driverId: number;
    busId: number;
    isActive: string;
};

export type DashboardCompanyTrips = {
    id: number;
    employeeId: number;
    driverId: number;
    busId: number;
    source: string;
    destination: string;
    totalSeats: number;
    remainingSeats: number;
    ticketPrice: number;
    expectedDepartTime: string;
    expectedArrivalTime: string;
    actualDepartTime: string | null;
    actualArrivalTime: string | null;
    isActive: boolean;
};