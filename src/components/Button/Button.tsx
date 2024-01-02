import React from "react";
import ButtonWrapper from "./button.ts";
import Loader from "../Loader/Loader.tsx";
import { LabelStyles } from "../../core/constants/components/text/textStyledComponents.ts";

function Button({
  children,
  icon,
  className,
  onClick,
  loading,
  $noTransition,
  disabled,
  type,
}: {
  children?: React.ReactNode;
  icon?: string;
  className?: string | undefined;
  onClick?: () => void;
  loading?: boolean;
  $noTransition?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <ButtonWrapper
      $isChildren={children ? true : false}
      className={`common-flex ${className ?? ""}`}
      onClick={onClick!}
      $noTransition={$noTransition}
      disabled={disabled ?? false}
      type={type ? type : "button"}
    >
      {loading ? (
        <Loader className="btn-loader" />
      ) : (
        <>
          {icon && <span className="material-symbols-outlined"> {icon} </span>}
          {children && <LabelStyles>{children}</LabelStyles>}
        </>
      )}
    </ButtonWrapper>
  );
}

export default Button;
