import { Tooltip, TooltipTrigger, TooltipContent } from "react_utils/tooltips";
import { Svg } from "react_utils/svgs";
import { mergec } from "/src/misc/misc.js";

function Widget({
  onClick: handleClick,
  placement = "top",
  offset = 20,
  content = "widget",
  $disabled,
  size,
  className,
  children,
} = {}) {
  return (
    <Tooltip placement={placement} offset={offset}>
      <TooltipTrigger
        size={size}
        onClick={!$disabled && handleClick}
        className={mergec("trigger", "widget", className)}
      >
        <Svg>{children}</Svg>
      </TooltipTrigger>
      <TooltipContent className={className + " tooltip"}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

export { Widget };
