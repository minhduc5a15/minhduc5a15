import { v4 } from "uuid";
import { css } from "@emotion/css";
import { styles } from "../../../styles";
import { random, sizeList } from "./random";
const Bubbles = () => {
     return (
          <ul className={styles["bubble-list"]}>
               {Array.from({ length: random.length }).map((_, i) => {
                    return <li key={v4()} className={css`
                         &::before {
                              top: ${sizeList[i] / 4}px;
                              left: ${sizeList[i] / 4}px;
                         }
                    `} style={random[i]}>
                         {Array.from({ length: 5 }).map((_) => {
                              return <span key={v4()}></span>
                         })}
                    </li>
               })}
          </ul>
     );
};
export default Bubbles;
