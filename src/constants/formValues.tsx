import { z } from "zod";

// Academic year options
export const AcademicYearOptions = z.enum([
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate",
]);

// 2 letter state abbreviations
export const StateOptions = z.enum([
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]);

// Graduation year options
export const GraduationYearOptions = z.enum([
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
  "2033",
  "2034",
  "2035",
  "2036",
  "2037",
  "2038",
  "2039",
  "2040",
  "2041",
  "2042",
  "2043",
  "2044",
  "2045",
  "2046",
  "2047",
  "2048",
  "2049",
  "2050",
]);
