import { styles } from "../../../styles";
import { useEffect, useState } from "react";
import useStore from "../../../provider/hooks";
const Toggle = () => {
     const { setCount } = useStore();
     const [theme, setTheme] = useState(localStorage.getItem("theme") || "pink");
     const toggleTheme = () => {
          setTheme(theme === "pink" ? "blue" : "pink");
          document.documentElement.setAttribute("data-theme", theme);
          localStorage.setItem("theme", theme);
     };
     useEffect(() => {
          document.documentElement.setAttribute("data-theme", theme);
          localStorage.setItem("theme", theme);
     }, [theme]);
     return (
          <div onClick={toggleTheme} onDoubleClick={() => {
               setCount(count => count + 1);
          }} className={styles["toggle-box"]}>
               <span className={styles.toggle}></span>
          </div>
     );
};
export default Toggle;
