import Tooltip from "@mui/material/Tooltip";
import tooltipStyles from "./tooltip.ts";

const TooltipComponent = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) => {
  return (
    <Tooltip
      title={title}
      arrow
      componentsProps={{ tooltip: tooltipStyles.tooltip }}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipComponent;
