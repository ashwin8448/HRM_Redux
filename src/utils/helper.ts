import { FieldValues } from 'react-hook-form';
import {
  IAppEmployee,
  IDepartment,
  IGetEmployee,
  IPostEmployee,
  IRole,
  ISelectOptionProps,
  ISkill,
} from '../core/interfaces/interface.ts';
import { uploadImage } from './firebase.ts';

export function transformArrayToOptionsList(
  optionsArray: (ISkill | IDepartment | IRole)[]
) {
  return optionsArray.map((option: ISkill | IDepartment | IRole) => ({
    value: option.id,
    label:
      (option as ISkill)?.skill ||
      (option as IDepartment)?.department ||
      (option as IRole)?.role,
  }));
}

export const getDate = (dateVal: string) => {
  const [year, month, day] = dateVal.split('-');
  const newDate = new Date(`${year}-${month}-${day}`);
  return newDate.toISOString().split('T')[0];
};

export const getWorkExp = (dateOfJoining: string) => {
  const [year, month, day] = dateOfJoining.split('-').map(Number);
  const dateInNewFormat = new Date(year, month - 1, day);
  const DOJ = new Date(dateInNewFormat);
  const now = new Date();
  const workExp: number = Math.floor(
    (now.getTime() - DOJ.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );
  if (workExp <= 1) return 'Less than a month';
  return workExp.toString() + '  months';
};

export const getDateView = (dateVal: string) => {
  const [year, month, day] = dateVal.split('-').map(Number);
  const monthName = new Date(year, month - 1, 1).toLocaleString('default', {
    month: 'long',
  });
  const dateFormatted = day + ' ' + monthName + ' ' + year;
  return dateFormatted;
};

export const getUrlType = (pathName: string) => {
  const pathParts = pathName.split('/');
  const secondPartOfPath = pathParts[1];
  return secondPartOfPath;
};

export const convertIGetEmployeeToIAppEmployee = (
  employee: IGetEmployee
): IAppEmployee => {
  const {
    moreDetails,
    skills,
    lastName,
    department,
    role,
    email,
    phone,
    designation,
    salary,
    address,
    isActive,
    ...rest
  } = employee;
  return {
    ...rest,
    isActive: isActive ? 'Yes' : 'No', // TODO: maintain it as true or false
    lastName: lastName ?? '',
    email: email ?? '',
    phone: phone ?? '',
    designation: designation ?? '',
    salary: salary ?? '',
    address: address ?? '',
    skills: transformArrayToOptionsList(skills),
    department: department
      ? transformArrayToOptionsList([department])[0]
      : { value: 0, label: '' }, //TODO: null condition
    role: transformArrayToOptionsList([role])[0],
    photoId: moreDetails ? JSON.parse(moreDetails).photoId : '',
  };
};

export const convertFormDataToIPostEmployees = async (
  formData: FieldValues
): Promise<IPostEmployee> => {
  const { photoId, skills, department, role, isActive, ...rest } = formData;
  return {
    ...(rest as IPostEmployee),
    skills: skills.map((skill: ISelectOptionProps) => skill.value),
    department: department.value,
    role: role.value,
    isActive: isActive === 'Yes' ? true : false,
    moreDetails: JSON.stringify({
      photoId:
        typeof photoId![0] == 'object' ? await uploadImage(photoId![0]) : '',
    }),
  };
};
export function concatenateNames(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}
