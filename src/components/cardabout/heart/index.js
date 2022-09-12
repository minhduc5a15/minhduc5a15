import Loading from "../../loading";
import { styles } from "../../../styles";
import { rootRef } from "../../../firebase";
import { useState, useEffect, useRef } from "react";
import { KeyLocalStorage } from "../../../firebase/config";
import { default as HeartIcon } from "@mui/icons-material/FavoriteBorderOutlined";
import { default as HeartIconOutlined } from "@mui/icons-material/FavoriteOutlined";

const Heart = () => {
     const [data, setData] = useState(0);
     const [count, setCount] = useState(0);
     const [heart, setHeart] = useState("");
     const ref = useRef(rootRef["like"]);
     useEffect(() => {
          ref.current.on("value", (snapshot) => {
               setCount(snapshot.val());
          });
          window.localStorage.getItem(KeyLocalStorage) && window.localStorage.removeItem(KeyLocalStorage);
     }, []);
     const Counter = async () => {
          if (heart !== "true") {
               window.localStorage.setItem("isHeart", "true");
               await ref.current.set(count + 1);
          }
     };
     useEffect(() => {
          ref.current.on("value", (snapshot) => {
               setData(snapshot.val());
          });
          setHeart(window.localStorage.getItem("isHeart"));
          return () => ref.current.off();
     }, [data]);
     return (
          <div data-aos="fade-right"
               data-aos-duration="600"
               data-aos-delay="650"
               className={styles["heart-container"]}>
               <div className={styles.heart} tabIndex="1">
                    {heart !== "true" ? <HeartIcon onClick={Counter} /> : <HeartIconOutlined style={{ color: "var(--heart-color-action)" }} />}
               </div>
               <div className={styles.currentcount} style={{ cursor: data === 0 ? "progress" : "" }}>
                    {data === 0 ? <Loading /> : data}
               </div>
          </div>
     );
};
export default Heart;
