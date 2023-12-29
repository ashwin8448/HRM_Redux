import { useState, useEffect } from "react";
import { ISkill } from "../../core/interfaces/interface.ts";
import TooltipWrapper from "./tooltip";

function Tooltip({
  message,
  className,
}: {
  message: ISkill[] | string;
  className?: string;
}) {
  let tooltipMsg = "";
  if (Array.isArray(message))
    tooltipMsg = message.map((msg) => msg.skill).join(", ");
  else tooltipMsg = message;
  return <TooltipWrapper className={className}>{tooltipMsg}</TooltipWrapper>;
}

export default Tooltip;
