import { css } from "@emotion/css";
import { styles } from "../../../styles";

const NameContainer = () => {
     return (
          <div className={css`
                    width: 100%;
                    height: 35%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
               `}
               data-aos="fade-right"
               data-aos-duration="600"
               data-aos-delay="650">
               <p className={styles.name}>
                    <span>P</span>
                    <span>Minh</span>
                    <span>Duc</span>
               </p>
          </div>
     );
};
export default NameContainer;
