import { css } from "@emotion/css";

const TypingBox = ({ children }) => {
     return (
          <div className={css`
                    width: 75%;
                    height: 60%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: var(--typing-color);
                    font-size: 20px;
                    letter-spacing: 1px;
                    font-weight: 550;
                    @media only screen and (max-width: 450px) {
                         font-size: 17px;
                    }
               `}>
               {children}
          </div>
     );
};
export default TypingBox;
