import { useState } from "react";
import { styles } from "../../../styles";
import GithubIcon from "@mui/icons-material/GitHub";

const Github = () => {
     const [isHover, setIsHover] = useState(false);
     return (
          <div className={styles["button"]}>
               <button onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <a href={"https://github.com/minhduc5a15"} target={"blank"}>
                         <span>{isHover ? <GithubIcon /> : "Github"}</span>
                    </a>
               </button>
          </div>
     );
};
export default Github;
