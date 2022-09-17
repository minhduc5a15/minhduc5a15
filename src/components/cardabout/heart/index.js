import Loading from "../../loading";
import { styles } from "../../../styles";
import { rootRef } from "../../../firebase";
import { useState, useEffect, useRef } from "react";
import { default as HeartIcon } from "@mui/icons-material/FavoriteBorderOutlined";
import { default as HeartIconOutlined } from "@mui/icons-material/FavoriteOutlined";
const getIsHeart = () => {
     return window.localStorage.getItem("heart") || "false";
};
const Heart = () => {
     const [data, setData] = useState(0);
     const [heart, setHeart] = useState(getIsHeart("heart"));
     const [value, setValue] = useState(heart === "true" ? 1 : 0);
     const ref = useRef(rootRef["like"]);
     var heartCount = data;
     const Counter = async () => {
          if (heart !== "true") {
               window.localStorage.setItem("heart", "true");
               setHeart(getIsHeart("heart"));
               await ref.current.set(heartCount + 1);
          }
          else {
               window.localStorage.setItem("heart", "false");
               setHeart(getIsHeart("heart"));
               await ref.current.set(heartCount - value);
          };
     };
     useEffect(() => {
          ref.current.on("value", (snapshot) => {
               setData(snapshot.val());
          });
          heart === "true" ? setValue(1) : setValue(0);
          return () => ref.current.off();
     }, [data]);
     return (
          <div data-aos="fade-right"
               data-aos-duration="600"
               data-aos-delay="650"
               className={styles["heart-container"]}>
               <div className={styles["heart"]} tabIndex={1}>
                    <span onClick={Counter}>
                         {heart !== "true" ? <HeartIcon /> : <HeartIconOutlined style={{ color: "var(--heart-color-action)" }} />}
                    </span>
               </div>
               <div className={styles.currentcount} style={{ cursor: data === 0 && "progress" }}>
                    {data === 0 ? <Loading /> : data}
               </div>
          </div>
     );
};
export default Heart;
