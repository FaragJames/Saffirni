export type CompanyBusStations = {
    busStationId: number;
    fullName: string;
};

export type CompanyTripInfo = {
    SourceBusStationId: string;
    DestinationBusStationId: string;
    ExpectedDepartTime: string;
    ExpectedArrivalTime: string;
    TicketPrice: number;
    DriverId: number;
    BusId: number;
    IsActive: string;
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