import { useState } from "react";
import { styles } from "../../../styles";
import { default as FacebookIcon } from "@mui/icons-material/FacebookOutlined";

const Facebook = () => {
     const [isHover, setIsHover] = useState(false);
     return (
          <div className={styles["button"]}>
               <button onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={() => window.open("https://www.facebook.com/PMjnhDuck/", "_blank")}>
                    <div>
                         <span>{isHover ? <FacebookIcon /> : "Facebook"}</span>
                    </div>
               </button>
          </div>
     );
};
export default Facebook;
