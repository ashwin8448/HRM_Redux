import React from "react";
import ButtonWrapper from "./button.ts";

function Button({
    children,
    icon,
    className,
    onClick,
    loading,
}: {
    children?: React.ReactNode;
    icon?: string;
    className?: string | undefined;
    onClick?: () => void;
    loading?: boolean;
}) {
    return (
        <ButtonWrapper
            $isChildren={children ? true : false}
            className={`common-flex ${className ?? ""}`}
            onClick={onClick!}
        >
            {loading ? (
                <span className="btn-loader" />
            ) : (
                <>
                    {icon && <span className="material-symbols-outlined"> {icon} </span>}
                    {children && <label>{children}</label>}
                </>
            )}
        </ButtonWrapper>
    );
}

export default Button;
