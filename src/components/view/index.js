import Loading from "../loading";
import { styles } from "../../styles";
import { rootRef } from "../../firebase";
import { VisitCountDb } from "../../firebase/config";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useCallback, useEffect, useState, useRef } from "react";

const View = () => {
     const [visitCount, setVisitCount] = useState(NaN);
     const ref = useRef(rootRef["view"]);
     const UpdateVisitCount = useCallback(() => {
          fetch(VisitCountDb)
               .then((res) => res.json())
               .then((res) => {
                    ref.current.set(parseInt(res.value));
               });
          return;
     }, []);
     useEffect(() => {
          UpdateVisitCount();
     }, []);
     useEffect(() => {
          ref.current.on("value", (snapshot) => {
               setVisitCount(snapshot.val());
          });
          return () => ref.current.off();
     }, []);
     return (
          <div className={styles["view-box"]}>
               <span>
                    <VisibilityIcon />
               </span>
               <span>{isNaN(visitCount) ? <Loading /> : visitCount}</span>
          </div>
     );
};
export default View;
