import Twitter from "./twitter";
import Tiktok from "./tiktok";
import { css } from "@emotion/css";

const Box = () => {
     return (
          <div className={css`
                    position: absolute;
                    width: 65px;
                    height: 120px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    text-align: center;
                    @media only screen and (max-width: 450px) {
                         width: 60px;
                         height: 100px;
                    }
               `}>
               <Twitter />
               <Tiktok />
          </div>
     );
};
export default Box;
