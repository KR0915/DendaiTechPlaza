"use client"
import { useState } from "react";

export function useCheckboxOption() {
  const yearOptions = [
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];

  const departmentOptions = [
    { value: "FI", label: "FI" },
    { value: "SE", label: "SE" },
    { value: "CS", label: "CS" },
  ];

  const gradeOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const semesterOptions = [
    { value: "前期", label: "前期" },
    { value: "後期", label: "後期" },
  ];
  const [year, setYear] = useState("2024");
  const [department, setDepartment] = useState("FI");
  const [grade, setGrade] = useState("3");
  const [semester, setSemester] = useState("前期");

  const [yearChecked, setYearChecked] = useState(false);
  const [departmentChecked, setDepartmentChecked] = useState(false);
  const [gradeChecked, setGradeChecked] = useState(false);
  const [semesterChecked, setSemesterChecked] = useState(false);

  const handleClear = () => {
    setYearChecked(false);
    setDepartmentChecked(false);
    setGradeChecked(false);
    setSemesterChecked(false);
  };

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
    handleClear,
    yearOptions,
    departmentOptions,
    gradeOptions,
    semesterOptions,
  };
}
