import { ISelectOptionProps } from "../../core/interfaces/interface.ts";
import TooltipWrapper from "./tooltip";

function Tooltip({
  message,
  className,
}: {
  message: ISelectOptionProps[] | string;
  className?: string;
}) {
  let tooltipMsg = "";
  if (Array.isArray(message))
    tooltipMsg = message.map((msg) => msg.value).join(", ");
  else tooltipMsg = message;
  return <TooltipWrapper className={className}>{tooltipMsg}</TooltipWrapper>;
}

export default Tooltip;
