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