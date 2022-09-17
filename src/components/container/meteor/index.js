import { v4 } from "uuid";
import { css } from "@emotion/css";
import { styles } from "../../../styles";
import { rootRef } from "../../../firebase";
import { useState, useEffect, useRef } from "react";
const Meteor = () => {
     const [list, setList] = useState([]);
     const ref = useRef(rootRef["meteor"]);
     useEffect(() => {
          ref.current.on("value", (snapshot) => {
               setList(snapshot.val());
          });
          return () => ref.current.off();
     }, []);
     return (
          <div className={css`
                    width: 100%;
                    height: 100vh;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: -1;
                    @media only screen and (min-width: 575px) {
                         display: none;
                    }
               `}>
               {list.map((item) => {
                    return (
                         <span className={styles.meteor} key={v4()}
                              style={{
                                   top: `${item.top}px`,
                                   right: `${item.right}px`,
                                   animation: `${styles.meteorAnimate} ${item.time * 1.5}s ease-in-out infinite`,
                              }}></span>
                    );
               })}
          </div>
     );
};
export default Meteor;
