export type ApiResponse = {
    readonly isSuccess: boolean;
    readonly errors: Array<string> | null;
    readonly message: string | null;
};

export type GenericApiResponse<T> = ApiResponse & {
    readonly payload: T | null;
    readonly paginationInfo: Pagination | null;
};

export class Pagination {
    public readonly totalPages: number;
    public readonly totalCount: number;

    public constructor(totalCount: number, pageSize: number) {
        this.totalCount = totalCount
        this.totalPages = Math.ceil(totalCount/pageSize);
    }
}

export type FilteredCompanyTrips = {
    companyTripId: number;
    companyName: string;
    companyRating: number;
    source: string;
    destination: string;
    busType: string;
    totalSeats: number;
    remainingSeats: number;
    ticketPrice: number;
    expectedDepartTime: string;
    expectedArrivalTime: string;
    actualDepartTime: string | null;
    actualArrivalTime: string | null;
};

export type TemporaryReservationResponse = {
    reservationId: number;
    seatIdToSeatNumber: Map<number, number>;
};

export type EditRouteParams = {
    id?: string;
};

export type PatchRequest = {
    op: "replace";
    path: string;
    value: string;
}