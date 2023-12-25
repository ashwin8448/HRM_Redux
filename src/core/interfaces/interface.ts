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

export interface ISkill {
  id: number;
  skill: string;
}

export interface IDepartment {
  id: number;
  department: string;
}

export interface IRole {
  id: number;
  role: string;
}

export interface ISelectOptionProps {
  value?: number;
  label?: string;
}
