import { styles } from "../../../styles";
import TwitterIcon from "@mui/icons-material/Twitter";

const Twitter = () => {
     return (
          <div data-aos="fade-right"
               data-aos-duration="600"
               data-aos-delay="650"
               className={styles.twitter}
               onClick={() => window.open("https://twitter.com/PMinhDuck", "_blank")}>
               <TwitterIcon />
          </div>
     );
};
export default Twitter;
