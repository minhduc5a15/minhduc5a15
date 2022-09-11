import Cube from "../cube";
import Typing from "./typing";
import { styles } from "../../../styles";

const Wrapper = () => {
     return (
          <div data-aos="fade-right"
               data-aos-duration="400"
               data-aos-delay="650"
               className={styles["wrapper-container"]}>
               <Cube />
               <Typing />
               <Cube />
          </div>
     );
};
export default Wrapper;
