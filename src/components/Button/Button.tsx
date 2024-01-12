import React from "react";
import ButtonWrapper from "./button.ts";
import Loader from "../Loader/Loader.tsx";
import { LabelStyles } from "../../core/constants/components/text/textStyledComponents.ts";

const Button = ({
  children,
  icon,
  className,
  onClick,
  loading,
  $noTransition,
  disabled,
  type,
  $notification,
}: {
  children?: React.ReactNode;
  icon?: string;
  className?: string | undefined;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  $noTransition?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  $notification?: boolean;
}) => {
  return (
    <ButtonWrapper
      $isChildren={children ? true : false}
      className={`common-flex ${className ?? ""}`}
      onClick={onClick!}
      $noTransition={$noTransition}
      disabled={disabled ?? false}
      type={type ? type : "button"}
      $notification={$notification}
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
};

export default Button;
