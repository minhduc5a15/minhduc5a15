import { styles } from "../../../styles";
import { FaTiktok } from "react-icons/fa";

const Tiktok = () => {
     return (
          <div className={styles.tiktok}
               data-aos="fade-right"
               data-aos-duration="600"
               data-aos-delay="800">
               <FaTiktok />
          </div>
     );
};
export default Tiktok;
