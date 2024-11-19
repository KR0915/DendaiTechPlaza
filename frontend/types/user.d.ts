import { Pageable } from "./pageable";

export interface DendaiUser {
    userId: number;
    username: string;
    email: string;
}

export interface DendaiUserPaginatedResponse {
    content: DendaiUser[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}