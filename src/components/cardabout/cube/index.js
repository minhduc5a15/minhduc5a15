import { v4 } from "uuid";
import styled from "@emotion/styled";
import { styles } from "../../../styles";

const Side = styled.span`
     transform: rotateY(${prop => prop.item}deg) translateZ(10px);
     transition: 0.2s ease-in-out;
     @media only screen and (max-width: 450px) {
         transform: rotateY(${prop => prop.item}deg) translateZ(7.5px); 
     }
`;
const Cube = () => {
     const Deg = [0, 90, 180, 270];
     return (
          <div className={styles.cube}>
               <div className={styles.top}></div>
               <div>
                    {Deg.map((item) => {
                         return <Side key={v4()} item={item}></Side>
                    })}
               </div>
          </div>
     );
};
export default Cube;
