import { useState } from "react";
import { styles } from "../../../styles";
import GithubIcon from "@mui/icons-material/GitHub";

const Github = () => {
     const [isHover, setIsHover] = useState(false);
     return (
          <div className={styles["button"]}>
               <button
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={() => window.open("https://github.com/minhduc5a15", "_blank")}>
                    <div>
                         <span>{isHover ? <GithubIcon /> : "Github"}</span>
                    </div>
               </button>
          </div>
     );
};
export default Github;
