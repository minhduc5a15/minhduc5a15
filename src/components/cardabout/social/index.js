import Tiktok from "./tiktok";
import Github from "./github";
import Twitter from "./twitter";
import { Fragment } from "react";
import Facebook from "./facebook";
import { css } from "@emotion/css";
import { styles } from "../../../styles";
const Social = ({ social }) => {
     return (
          <Fragment>
               {social ? <div className={styles.social}>
                    <Twitter />
                    <Tiktok />
               </div> : <div className={css`
                              width: 100%;
                              height: 100%;
                              display: flex;
                         `}
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="650">
                    <Facebook />
                    <Github />
               </div>}
          </Fragment>
     );
};
export default Social;
