export interface ISkill {
    id: number;
    skill: string;
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
    value: string;
    label: string;
}

export interface ITableProps {
    department: ISelectOptionProps | null;
    designation: ISelectOptionProps | null;
    skills: ISelectOptionProps[] | null;
    employment_mode: ISelectOptionProps | null;
    search_term: string | null;
}