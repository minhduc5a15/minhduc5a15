import Aos from "aos";
import "./global.sass";
import "aos/dist/aos.css";
import { useEffect } from "react";

const GlobalStyles = ({ children }) => {
     useEffect(() => {
          Aos.init({
               duration: 2000,
          });
          Aos.refresh();
     }, []);
     return children;
};
export { default as styles } from "./app.module.sass" ;
export default GlobalStyles;
