import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { styles } from "../../../styles";
import { SET_NAME } from "../../../provider/actions";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Container = styled.div`
     width: 95%;
     height: auto;
     display: flex;
     justify-content: center;
     align-items: center;
`;
const Name = ({ name, onChange }) => {
     return (
          <div className={styles["box"]}
               data-aos="fade-up"
               data-aos-duration="600"
               data-aos-delay="400">
               <Container>
                    <div className={styles["box-icon"]}>
                         <AccountCircle />
                    </div>
                    <div className={styles["box-input"]}>
                         <input type="text" name="name" autoComplete="off" value={name}  maxLength={25} onChange={onChange(SET_NAME)} className={styles["box-text"]}
                         />
                         <label htmlFor="name" className={`${styles["box-label"]} ${css` ${name && `
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
                              Name
                         </label>
                    </div>
               </Container>
          </div>
     );
};
export default Name;
