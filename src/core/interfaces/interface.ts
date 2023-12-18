import { Control } from "react-hook-form";

export interface IData{
    employeesData: IEmployeeData,
    dropdownData:{
        departments:{
            loading: boolean,
            departments: ISelectOptionProps[]
        },
        roles:{
            loading: boolean,
            roles: ISelectOptionProps[]
        },
        skills:{
            loading: boolean,
            skills: ISelectOptionProps[]
        }
    },
    filterData:ITableProps
}
export interface IEmployeeData {
  employeesForList: IEmployee[];
  count: number;
  loading: boolean;
}
export interface IEmployee {
    id: string,
    firstName: string,
    lastName?: string,
    isActive?: boolean,
    dob?: string,
    email?: string,
    phone?: string,
    designation?: string,
    salary?: string,
    dateOfJoining?: string,
    address?: string,
    moreDetails: {[key:string]:string},
    role?: IRole,
    department?: IDepartment,
    skills?: ISkill[],
}
export interface ISkill {
    id: number;
    skill: string;
}
export interface IRole {
    id: number,
    role: string
}
export interface IDepartment {
    id: number,
    department: string
}

//TODO:
export interface IFormEmployee {
    id: string,
    firstName: string | null,
    lastName: string | null,
    dob: string | null,
    email: string | null,
    phone: string | null,
    designation: string | null,
    salary?: string | null,
    dateOfJoining: string | null,
    address: string | null,
    role: ISelectOptionProps | null,
    department: ISelectOptionProps | null,
    skills: ISelectOptionProps[] | null,
}

export interface IDepartment {
    id: number;
    department: string;
}

export interface IRole {
    id: number;
    role: string;
}

export interface IEmpMode {
    id: number;
    mode: string;
}
export interface IErrorBoundaryProps {
    children: React.ReactNode;
}
export interface IErrorState {
    hasError: boolean;
    error: { message: string };
}

export interface InputProps {
    validation?: {
        minLength?: {
            value: number;
            message: string;
        };
        pattern?: {
            value: RegExp;
            message: string;
        };
        maxLength?: {
            value: number;
            message: string;
        };
        max?: {
            value: string;
            message: string;
        };
    };
    label: string;
    type: string;
    options?: string[];
    name: string;
    value?: string;
}
export interface ISelectOptionProps {
    value: number;
    label: string;
}

export interface ISelectDropdownProps {
    label: string;
    options?: ISelectOptionProps[]; //TODO: change to non nullable
    placeholder: string;
    isMulti?: boolean;
    control?: Control<IEmployee, any>;
    fieldName: keyof ITableProps;
    value?: ISelectOptionProps | ISelectOptionProps[] | null;
}

export interface ITableProps {
    department: ISelectOptionProps | null;
    skills: ISelectOptionProps[] | null;
    role: ISelectOptionProps | null;
    search_term: string | null;
}