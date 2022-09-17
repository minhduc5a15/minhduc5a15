import { v4 } from "uuid";
import { css } from "@emotion/css";
import { random, sizeList } from "./random";
const Bubbles = () => {
     return (
          <ul className={css`
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    @media only screen and (max-width: 575px) {
                         display: none;
                    }
                    & > li {
                         position: absolute;
                         list-style: none;
                         display: block;
                         background-color: var(--bubbles);
                         bottom: -20px;
                         opacity: 0;
                         border-radius: 50%;
                    }
                    & > li::before {
                         content: "";
                         position: absolute;
                         width: 10px;
                         height: 10px;
                         background: #fff;
                         border-radius: 50%;
                         filter: blur(2px);
                    }
                    & > li > span {
                         inset: 5px;
                         position: absolute;
                         border-radius: 50%;
                    }
                    & > li > span:nth-child(1) {
                         border-left: 5px solid #0051ff;
                         filter: blur(3px);
                    }
                    & > li > span:nth-child(2) {
                         border-right: 7px solid #ff008c;
                         filter: blur(5px);
                    }
                    & > li > span:nth-child(3) {
                         border-bottom: 5px solid #c2c2c2;
                         filter: blur(3px);
                    }
                    & > li > span:nth-child(4) {
                         border-top: 9px solid #d0e60d;
                         filter: blur(5px);
                    }
                    & > li > span:nth-child(5) {
                         border-left: 11px solid #ff008c;
                         filter: blur(9px);
                    }
               `}>
               {Array.from({ length: random.length }).map((_, i) => {
                    return <li key={v4()} className={css`
                         &::before {
                              top: ${sizeList[i] / 4}px;
                              left: ${sizeList[i] / 4}px;
                         }
                    `} style={random[i]}>
                         <span></span>
                         <span></span>
                         <span></span>
                         <span></span>
                         <span></span>
                    </li>
               })}
          </ul>
     );
};
export default Bubbles;
