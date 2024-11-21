import { Pageable, Sort } from "./pageable";

export interface postReply {
    replyId: number;
    content: string;
    createdAt: string;
    username: string;
    userId: number;
    commentId: number;
}

export interface postComment {
    commentId: number;
    content: string;
    createdAt: string;
    username: string;
    userId: number;
    replies: postReply[];
}

export interface CommentPage {
    content: postComment[];
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

export interface Post {
    postId: number;
    userId: string;
    username: string;
    sharedUrls?: string[]
    title: string;
    description: string;
    year: number;
    departmentId: number;
    departmentName: string;
    grade: number;
    semester: string;
    likesCount: number;
    createdAt: string;
    updatedAt: string;
    comments?: CommentPage;
}

export interface PostResponse {
    content: Post[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}