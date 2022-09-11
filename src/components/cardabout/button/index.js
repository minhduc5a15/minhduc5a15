import Github from "./github";
import Facebook from "./facebook";
import { css } from "@emotion/css";

const Button = () => {
     return (
          <div className={css`
                    width: 100%;
                    height: 100%;
                    display: flex;
               `}
               data-aos="fade-up"
               data-aos-duration="600"
               data-aos-delay="650">
               <Facebook />
               <Github />
          </div>
     );
};
export default Button;
