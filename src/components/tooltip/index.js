import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomWidthTooltip = styled(({ className, ...props }) => (
     <Tooltip {...props} classes={{ popper: className }} />
))({
     [`& .${tooltipClasses.tooltip}`]: {
          minWidth: "100px",
          minHeight: "40px",
          color: "var(--loading-color)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          background: "rgba(0, 0, 0, 0.2)",
          letterSpacing: "1.5px",
          cursor: "url(https://i.im.ge/2022/09/28/1EUadf.mouse-f2.png), auto",
          transform: "translateY(-10px)",
     },
});

export default CustomWidthTooltip;
