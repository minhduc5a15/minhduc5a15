import { css } from "@emotion/css";
import { styles } from "../../../styles";
const isValidEmail = str => typeof str === "string" && str.indexOf("@gmail.com") >= 1;

const isValidName = str => typeof str === "string" && str.length > 1;

const isValidMessage = str => isValidName(str);

const isValid = (email, name, message) => isValidEmail(email) && isValidName(name) && isValidMessage(message);

const Submit = ({ email, name, message, submit, setOpen }) => {
     const handleOpen = () => setOpen(true);
     return (
          <div className={styles["submit-container"]}
               data-aos="fade-up"
               data-aos-duration="600"
               data-aos-delay="600">
               <div className={styles["submit-box"]}>
                    <button className={css`
                              &:hover {
                                   ${isValid(email, name, message) && `
                                        height: 32px;
                                        width: 100%;
                                        font-size: 14px;
                                        border-radius: 5px;
                                        font-weight: 500;
                                        letter-spacing: 2px;
                                   `}
                              }
                         `}
                         type="submit"
                         disabled={!isValid(email, name, message)}
                         onClick={() => {
                              handleOpen();
                              submit(email, name, message);
                         }}>
                         Submit
                    </button>
               </div>
          </div>
     );
};
export default Submit;
