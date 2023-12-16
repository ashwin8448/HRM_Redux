import React from "react";
import ButtonWrapper from "./button.ts";

function Button({
  children,
  icon,
  className,
  onClick,
  loading,
  $noTransition,
  disabled,
}: {
  children?: React.ReactNode;
  icon?: string;
  className?: string | undefined;
  onClick?: () => void;
  loading?: boolean;
  $noTransition?: boolean;
  disabled?: boolean;
}) {
  return (
    <ButtonWrapper
      $isChildren={children ? true : false}
      className={`common-flex ${className ?? ""}`}
      onClick={onClick!}
      $noTransition={$noTransition}
      disabled={disabled ?? false}
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
