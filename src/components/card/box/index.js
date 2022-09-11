import { css } from "@emotion/css";

const Box = ({ children }) => {
     return (
          <div className={css`
                    width: 100%;
                    height: 50%;
                    background-color: transparent;
                    display: flex;
                    flex-direction: column;
               `}>
               {children}
          </div>
     );
};
export default Box;
