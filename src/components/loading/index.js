import { styles } from "../../styles";

const Loading = () => {
     return (
          <div className={styles["lds-ring"]}>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
          </div>
     );
};
export default Loading;
