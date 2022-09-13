import Name from "./name";
import { v4 } from "uuid";
import Percent from "./percent";
import { styles } from "../../../styles";
import { rootRef } from "../../../firebase";
import { useEffect, useState, useRef } from "react";

const List = () => {
     const [list, setList] = useState([]);
     const ref = useRef(rootRef["list"]);
     useEffect(() => {
          ref.current.on("value", (snapshot) => {
               setList(snapshot.val().sort((a, b) => b.percent - a.percent));
          });
          return () => ref.current.off();
     }, []);
     return (
          <div className={styles.list}>
               {list.map(({ name, percent }, index) => {
                    return (
                         <div data-aos="zoom-in-right"
                              data-aos-duration="600"
                              data-aos-delay={index * 100 + 500}
                              data-aos-once="true"
                              key={v4()}>
                              <Name name={name} />
                              <Percent percent={percent} />
                         </div>
                    );
               })}
          </div>
     );
};
export default List;
