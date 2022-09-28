import View from "../view";
import { styles } from "../../styles";
import CustomWidthTooltip from "../tooltip";

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
