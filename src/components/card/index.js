import { styles } from "../../styles";

const Card = ({ children }) => {
     return (
          <main className={styles.card}
               data-aos="zoom-in-right"
               data-aos-duration="500"
               data-aos-delay="200">
               {children}
          </main>
     );
};
export default Card;
