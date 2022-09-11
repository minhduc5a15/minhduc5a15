import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { styles } from "../../../styles";
import { useState, useEffect } from "react";
import EmailIcon from "@mui/icons-material/Email";
import { SET_EMAIL } from "../../../provider/actions";
const Container = styled.div`
     width: 95%;
     height: auto;
     display: flex;
     justify-content: center;
     align-items: center;
`;
const Email = ({ email, onChange }) => {
     const [innerWidth, setInnerWidth] = useState(0);
     const getWidth = () => {
          setInnerWidth(window.innerWidth);
     };
     useEffect(() => {
          window.addEventListener("resize", getWidth);
          return () => window.removeEventListener("resize", () => { });
     }, [window.innerWidth]);
     return (
          <div className={styles["box"]}
               data-aos="fade-right"
               data-aos-duration="600"
               data-aos-delay="300">
               <Container>
                    <div className={styles["box-icon"]}>
                         <EmailIcon />
                    </div>
                    <div className={styles["box-input"]}>
                         <input className={styles["box-text"]}
                              type="text"
                              autoFocus={innerWidth > 768 ? true : false}
                              autoComplete="off"
                              onChange={onChange(SET_EMAIL)}
                              value={email}
                         />
                         <label className={`${styles["box-label"]} ${css`${email && `
                                                  transform: translateY(-21px) translateX(7px);
                                                  font-size: 13px;
                                                  color: var(--box-input-border-focus);
                                                  @media screen and (max-width: 575px) {
                                                       transform: translateY(-21px) translateX(7px);
                                                       font-size: 11px;
                                                       color: var(--box-input-border-focus);
                                                  }
                                             `}
                                        `}
                                   `}>
                              Email
                         </label>
                    </div>
               </Container>
          </div>
     );
};
export default Email;
