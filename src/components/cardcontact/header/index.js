import { styles } from "../../../styles";

const Header = () => {
     return (
          <header className={styles["header-container"]}
               data-aos="fade-right"
               data-aos-duration="600"
               data-aos-delay="200">
               <span>Get in touch</span>
          </header>
     );
};
export default Header;
