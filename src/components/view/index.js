import Loading from "../loading";
import { styles } from "../../styles";
import { rootRef } from "../../firebase";
import abbreviateNumber from "./shorten";
import CustomWidthTooltip from "../tooltip";
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
          return () => ref.current.off();
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
          <CustomWidthTooltip title={visitCount} enterDelay={200} leaveDelay={50}>
               <div className={styles["view-box"]}>
                    <span>
                         <VisibilityIcon />
                    </span>
                    <span>{isNaN(visitCount) ? <Loading /> : abbreviateNumber(visitCount)}</span>
               </div>
          </CustomWidthTooltip>
     );
};
export default View;
