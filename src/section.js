import { css } from "@emotion/css";
import useStore from "./provider/hooks";
const Section = ({ children }) => {
     const { count } = useStore();
     return (
          <section className={css`
                         width: 100%;
                         height: 100vh;
                         display: ${count % 2 === 0 ? "flex" : "none"};
                         justify-content: center;
                         align-items: center;
                         flex-direction: column;
                         z-index: 1;
                    `}>
               {children}
          </section>
     );
};
export default Section;
