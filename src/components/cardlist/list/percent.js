import { styles } from "../../../styles";

const Percent = ({ percent }) => {
     return (
          <div className={styles["process-bar"]}>
               <span className={styles["process-bar-percent"]}>
                    <span style={{ width: `${percent}%` }}>{percent}%</span>
               </span>
          </div>
     );
};
export default Percent;
