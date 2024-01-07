import {
  IActionEmployeeData,
  IAppEmployee,
  ISelectOptionProps
} from "../../interfaces/interface";

export interface ISET_LOADING {
  type:
    | "SET_LOADING"
    | "SET_SKILLS_LOADING"
    | "SET_DEPARTMENTS_LOADING"
    | "SET_ROLES_LOADING";
  payload: {
    loading: boolean;
  };
}
export interface ISET_EMPLOYEES {
  type: "SET_EMPLOYEES";
  payload: IActionEmployeeData;
}

export interface ISET_EMPLOYEES_LIST {
  type: "SET_EMPLOYEES_LIST";
  payload: IActionEmployeeData;
}

export interface ISET_EMPLOYEES_GRID {
  type: "SET_EMPLOYEES_GRID";
  payload: IActionEmployeeData;
}

export interface ISET_DEPARTMENTS {
  type: "SET_DEPARTMENTS";
  payload: ISelectOptionProps[];
}

export interface ISET_ROLES {
  type: "SET_ROLES";
  payload: ISelectOptionProps[];
}

export interface ISET_SKILLS {
  type: "SET_SKILLS";
  payload: ISelectOptionProps[];
}

export interface IRESET_EMPLOYEES {
  type: "RESET_EMPLOYEES_GRID";
}

export interface ISET_USER {
  type: "LOGIN" | "LOGOUT";
  payload?: IAppEmployee;
}
