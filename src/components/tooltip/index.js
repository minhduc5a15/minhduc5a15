import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomWidthTooltip = styled(({ className, ...props }) => (
     <Tooltip {...props} classes={{ popper: className }} />
))({
     [`& .${tooltipClasses.tooltip}`]: {
          minWwidth: 95,
          minHeight: 40,
          color: "var(--loading-color)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          background: "rgba(34, 34, 34, 0.3)",
          letterSpacing: "1.5px",
          fontWeight: "bold",
          transform: "translateY(-10px)",
     },
});

export default CustomWidthTooltip;