import { Control } from "react-hook-form";

export interface IData {
  employeesData: IEmployeeData;
  dropdownData: {
    departments: {
      loading: boolean;
      departments: ISelectOptionProps[];
    };
    roles: {
      loading: boolean;
      roles: ISelectOptionProps[];
    };
    skills: {
      loading: boolean;
      skills: ISelectOptionProps[];
    };
  };
  filterData: ITableProps;
}

export interface IEmployeeData {
  employees: IAppEmployee[];
  count: number;
  loading: boolean;
}

interface ICommonEmployeeFields {
  firstName: string;
  dob: string;
  dateOfJoining: string;
}

export interface IGetEmployee extends ICommonEmployeeFields {
  id: string;
  isActive: boolean;
  role: IRole;
  skills: ISkill[];
  department: IDepartment | null;
  moreDetails: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  designation: string | null;
  salary: string | null;
  address: string | null;
}

export interface IAppEmployee extends ICommonEmployeeFields {
  id: string;
  isActive: string;
  photoId: string;
  role: ISelectOptionProps|string;
  department: ISelectOptionProps|string;
  skills: ISelectOptionProps[]|string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  salary: string;
  address: string;
}

export interface IPostEmployee extends ICommonEmployeeFields {
  moreDetails: string;
  role: number;
  isActive: boolean;
  department: number;
  skills: number[];
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  salary: string;
  address: string;
}

export interface ISkill {
  id: number;
  skill: string;
}
export interface IRole {
  id: number;
  role: string;
}
export interface IDepartment {
  id: number;
  department: string;
}

export interface IDepartment {
  id: number;
  department: string;
}

export interface IRole {
  id: number;
  role: string;
}

export interface IErrorBoundaryProps {
  children: React.ReactNode;
}
export interface IErrorState {
  hasError: boolean;
  error: { message: string };
}

export interface IInputProps {
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
  options?: string[] | ISelectOptionProps[];
  name: string;
  isRequired: boolean;
  placeholder?: string;
  isMulti?: boolean;
  accept?: string;
}

export interface ISelectOptionProps {
  value?: number;
  label?: string;
}

export interface ISelectDropdownProps {
  label: string;
  options?: ISelectOptionProps[]; //TODO: change to non nullable
  placeholder: string;
  isMulti?: boolean;
  control?: Control<IAppEmployee, any>;
  fieldName: keyof ITableProps;
  value?: ISelectOptionProps | ISelectOptionProps[] | null;
}

export interface ITableProps {
  department: ISelectOptionProps | null;
  skills: ISelectOptionProps[] | null;
  role: ISelectOptionProps | null;
  search_term: string | null;
}
