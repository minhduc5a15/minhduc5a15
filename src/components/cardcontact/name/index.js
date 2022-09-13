import { Container } from "../email";
import { styles } from "../../../styles";
import { SET_NAME } from "../../../provider/actions";
import AccountCircle from "@mui/icons-material/AccountCircle";

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
                         <input type="text" name="name" autoComplete="off" value={name}  maxLength={25} onChange={onChange(SET_NAME)} className={styles["box-text"]} />
                         <label htmlFor="name" className={`${styles["box-label"]} ${name && styles["box-label-valid"]}`}>
                              Name
                         </label>
                    </div>
               </Container>
          </div>
     );
};
export default Name;
