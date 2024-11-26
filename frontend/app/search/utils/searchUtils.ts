import { PostResponse } from "@/types/post";

export function isPostResponse(
  response: string | PostResponse
): response is PostResponse {
  return (response as PostResponse).content !== undefined;
}

export const yearOptions = [
  { value: "2017", label: "2017" },
  { value: "2018", label: "2018" },
  { value: "2019", label: "2019" },
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

export const departmentOptions = [
  { value: "AD", label: "AD" },
  { value: "AJ", label: "AJ" },
  { value: "EK", label: "EK" },
  { value: "EF", label: "EF" },
  { value: "ES", label: "ES" },
  { value: "EC", label: "EC" },
  { value: "EJ", label: "EJ" },
  { value: "EH", label: "EH" },
  { value: "FI", label: "FI" },
  { value: "FA", label: "FA" },
  { value: "FR", label: "FR" },
  { value: "NC", label: "NC" },
  { value: "NM", label: "NM" },
  { value: "NE", label: "NE" },
  { value: "RB", label: "RB" },
  { value: "RE", label: "RE" },
  { value: "RD", label: "RD" },
  { value: "RU", label: "RU" },
  { value: "RM", label: "RM" },
  { value: "RG", label: "RG" },
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
