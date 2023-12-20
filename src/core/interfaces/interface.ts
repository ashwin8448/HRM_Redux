import { Control } from 'react-hook-form';

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
}
export interface IEmployeeData {
  employees: IEmployee[];
  count: number;
  loading: boolean;
}
export interface IEmployee {
  id: string;
  firstName: string;
  lastName?: string;
  isActive?: boolean;
  dob?: string;
  email?: string;
  phone?: string;
  designation?: string;
  salary?: string;
  dateOfJoining?: string;
  address?: string;
  moreDetails: { [key: string]: string };
  role?: IRole;
  department?: IDepartment;
  skills?: ISkill[];
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
  value?: {
    skillFilterState: ISelectOptionProps[];
    setSkillFilterState: React.Dispatch<
      React.SetStateAction<ISelectOptionProps[]>
    >;
  } | null;
}