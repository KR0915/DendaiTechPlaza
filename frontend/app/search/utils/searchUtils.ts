import { PostResponse } from "@/types/post";

export function isPostResponse(
  response: string | PostResponse
): response is PostResponse {
  return (response as PostResponse).content !== undefined;
}

export const yearOptions = [
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
];

export const departmentOptions = [
  { value: "FI", label: "FI" },
  { value: "SE", label: "SE" },
  { value: "AD", label: "AD" },
];

export const gradeOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

export const semesterOptions = [
  { value: "前期", label: "前期" },
  { value: "後期", label: "後期" },
  { value: "その他", label: "その他" },
];

