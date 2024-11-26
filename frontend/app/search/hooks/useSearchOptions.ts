import { useState, useCallback, useEffect } from 'react';

export type SearchOptionsReturn = {
  year: string;
  setYear: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
  grade: string;
  setGrade: (value: string) => void;
  semester: string;
  setSemester: (value: string) => void;
  yearChecked: boolean;
  setYearChecked: (checked: boolean) => void;
  departmentChecked: boolean;
  setDepartmentChecked: (checked: boolean) => void;
  gradeChecked: boolean;
  setGradeChecked: (checked: boolean) => void;
  semesterChecked: boolean;
  setSemesterChecked: (checked: boolean) => void;
  searchText: string;
  setSearchText: (value: string) => void;
  handleClear: () => void;
};

export const useSearchOptions = (): SearchOptionsReturn => {
  const [year, setYear] = useState(() => localStorage.getItem("year") || "2024");
  const [department, setDepartment] = useState(() => localStorage.getItem("department") || "FI");
  const [grade, setGrade] = useState(() => localStorage.getItem("grade") || "3");
  const [semester, setSemester] = useState(() => localStorage.getItem("semester") || "前期");
  const [yearChecked, setYearChecked] = useState(() => localStorage.getItem("yearChecked") === "true");
  const [departmentChecked, setDepartmentChecked] = useState(() => localStorage.getItem("departmentChecked") === "true");
  const [gradeChecked, setGradeChecked] = useState(() => localStorage.getItem("gradeChecked") === "true");
  const [semesterChecked, setSemesterChecked] = useState(() => localStorage.getItem("semesterChecked") === "true");
  const [searchText, setSearchText] = useState(() => localStorage.getItem("searchText") || "");

  useEffect(() => {
    localStorage.setItem("year", year);
    localStorage.setItem("department", department);
    localStorage.setItem("grade", grade);
    localStorage.setItem("semester", semester);
    localStorage.setItem("yearChecked", yearChecked.toString());
    localStorage.setItem("departmentChecked", departmentChecked.toString());
    localStorage.setItem("gradeChecked", gradeChecked.toString());
    localStorage.setItem("semesterChecked", semesterChecked.toString());
    localStorage.setItem("searchText", searchText);
  }, [year, department, grade, semester, yearChecked, departmentChecked, gradeChecked, semesterChecked, searchText]);

  const handleClear = useCallback(() => {
    setYearChecked(false);
    setDepartmentChecked(false);
    setGradeChecked(false);
    setSemesterChecked(false);
  }, []);

  return {
    year,
    setYear,
    department,
    setDepartment,
    grade,
    setGrade,
    semester,
    setSemester,
    yearChecked,
    setYearChecked,
    departmentChecked,
    setDepartmentChecked,
    gradeChecked,
    setGradeChecked,
    semesterChecked,
    setSemesterChecked,
    searchText,
    setSearchText,
    handleClear,
  };
};