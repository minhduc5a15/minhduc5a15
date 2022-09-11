import styled from "@emotion/styled";
import { styles } from "../../../styles";

const AvatarContainer = styled.div`
     position: relative;
     width: 100%;
     height: 100%;
     display: flex;
     justify-content: center;
     align-items: flex-end;
     border-image-slice: 1;
`;

const Avatar = () => {
     return (
          <AvatarContainer data-aos="fade-up" data-aos-duration="600" data-aos-delay="650">
               <div className={styles["avatar"]}></div>
          </AvatarContainer>
     );
};
export default Avatar;
