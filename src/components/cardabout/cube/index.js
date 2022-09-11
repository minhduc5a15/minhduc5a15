import { styles } from "../../../styles";

const Cube = () => {
     const Deg = [0, 90, 180, 270];
     return (
          <div className={styles["cube-container"]}>
               <div className={styles.cube}>
                    <div className={styles.top}></div>
                    <div>
                         {Deg.map((item) => {
                              return (
                                   <span style={{ transform: `rotateY(${item}deg) translateZ(10px)` }} key={item}></span>
                              );
                         })}
                    </div>
               </div>
          </div>
     );
};
export default Cube;
