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