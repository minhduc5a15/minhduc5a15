import { styles } from "../../../styles";
import useStore from "../../../provider/hooks";
import { RESET } from "../../../provider/actions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { default as CheckCircle } from "@mui/icons-material/CheckCircleOutline";
const Alert = () => {
     const { open, setOpen, dispatch } = useStore();
     const reset = () => {
          dispatch({
               type: RESET,
               email: "",
               name: "",
               message: "",
          });
     };
     return (
          <main
               className={styles["alert-wrapper"]}
               style={{ display: open ? "flex" : "none" }}>
               <div className={styles["alert-container"]}>
                    <div className={styles["alert-content"]}>
                         <span>
                              <CheckCircle />
                         </span>
                         <p>Submit successfully</p>
                    </div>
                    <div className={styles["alert-button"]}>
                         <IconButton onClick={() => {
                              setOpen(false);
                              reset();
                         }}
                              aria-label="close"
                              color="inherit"
                              sx={{
                                   width: "70%",
                                   height: "100%",
                              }}>
                              <CloseIcon />
                         </IconButton>
                    </div>
               </div>
          </main>
     );
};
export default Alert;
