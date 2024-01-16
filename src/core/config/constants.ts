export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
  NO_SORT = "no-sort",
}

export const apiURL = {
  employee: "/employee",
  skills: "/skills",
  roles: "/roles",
  departments: "/departments",
  authSignIn: "/auth/sign-in",
  authSignUp: "/auth/sign-up",
  authRenew: "/auth/renew-token",
};

//Search Params
export const defaultPageSize = { page: "1" };
export const debounceTimeout = 500;

//fetch employees params
export const defaultSortBy = "id";
export const defaultSortDir = "asc";

// displayValues
export const listDisplay = "List";
export const gridDisplay = "Grid";

//pagination/infiinite loading
export const DOTS = "...";
export const thresholdPageSize = 6;
export const recordsPerPage = 12;
export const paginationItemsCount = 3 + 2 * 1;
export const totalPages = (count: number) =>
  Math.ceil(Number(count) / recordsPerPage);

export const sortOptions = [
  { criteria: "id", label: "Id" },
  { criteria: "firstName", label: "Name" },
  { criteria: "department.id", label: "Department" },
  { criteria: "designation", label: "Designation" },
  { criteria: "role.id", label: "Role" },
];
