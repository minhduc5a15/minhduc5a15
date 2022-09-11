import View from "../view";
import { styles } from "../../styles";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomWidthTooltip = styled(({ className, ...props }) => (
     <Tooltip {...props} classes={{ popper: className }} />
))({
     [`& .${tooltipClasses.tooltip}`]: {
          width: 95,
          height: 40,
          color: "var(--tooltip-color)",
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
const Header = ({ onClick, icon, page }) => {
     return (
          <header>
               <div className={styles["header-icon"]} onClick={onClick}>
                    <CustomWidthTooltip title={page(icon % 3).title} enterDelay={200} leaveDelay={50}>
                         <div className={styles.icon}>
                              {page(icon % 3).icon}
                         </div>
                    </CustomWidthTooltip>
               </div>
               <View />
          </header>
     );
};
export default Header;
