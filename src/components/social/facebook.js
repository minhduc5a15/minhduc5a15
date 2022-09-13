import { useState } from "react";
import { styles } from "../../../styles";
import { default as FacebookIcon } from "@mui/icons-material/FacebookOutlined";

const Facebook = () => {
     const [isHover, setIsHover] = useState(false);
     return (
          <div className={styles["button"]}>
               <button onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <a href={"https://www.facebook.com/PMjnhDuck/"} target={"_blank"}>
                         <span>{isHover ? <FacebookIcon /> : "Facebook"}</span>
                    </a>
               </button>
          </div>
     );
};
export default Facebook;
