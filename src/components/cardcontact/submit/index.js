import { css } from "@emotion/css";
import { styles } from "../../../styles";
const isValidEmail = (str) => {
     const text = "@gmail.com";
     if (typeof str === "string") {
          if (str.indexOf(text) >= 1) {
               return true;
          }
     }
     return false;
};
const isValidName = (str) => {
     if (typeof str === "string") return str.length > 1;
};
const isValidMessage = (str) => {
     if (typeof str === "string") return str.length > 1;
};

const isValid = (email, name, message) => {
     if (!isValidEmail(email) || !isValidName(name) || !isValidMessage(message)) {
          return false;
     }
     return true;
};
const Submit = ({ email, name, message, submit, setOpen }) => {
     const handleOpen = () => {
          setOpen(true);
     };
     return (
          <div className={styles["submit-container"]}
               data-aos="fade-up"
               data-aos-duration="600"
               data-aos-delay="600">
               <div className={styles["submit-box"]}>
                    <button className={css`
                              &:hover {
                                   ${isValid(email, name, message) && `
                                        height: 100%;
                                        width: 100%;
                                        font-size: 17px;
                                        border-radius: 2px;
                                        letter-spacing: 2px;
                                   `}
                              }
                         `}
                         disabled={!isValid(email, name, message)}
                         type="submit"
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
