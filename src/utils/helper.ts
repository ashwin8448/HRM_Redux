import {
  IDepartment,
  IRole,
  ISkill,
} from "../core/interfaces/interface.ts";

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

export function concatenateNames(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function getCookie(name:string) {
  const value = `; ${document.cookie}`;
  const parts:string[] = value?.split(`; ${name}=`) ?? [];
  if (parts && parts.length === 2) 
      return parts?.pop()?.split(';')?.shift();
  return null;
}

