import Loading from "../loading";
import { styles } from "../../styles";
import { rootRef } from "../../firebase";
import { useEffect, useState, useRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const View = () => {
     const [visitCount, setVisitCount] = useState(NaN);
     const ref = useRef(rootRef["view"]);
     var count = visitCount;
     useEffect(() => {
          ref.current.on("value", (snapshot) => {
               setVisitCount(snapshot.val());
          });
          return () => ref.current.off();
     }, []);
     useEffect(() => {
          !isNaN(count) && ref.current.set(count + 1);
          return () => ref.current.off();
     }, [count]);
     return (
          <div className={styles["view-box"]}>
               <span><VisibilityIcon /></span>
               <span>{isNaN(visitCount) ? <Loading /> : visitCount}</span>
          </div>
     );
};
export default View;
