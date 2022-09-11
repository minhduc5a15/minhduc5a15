import { styles } from "../../../styles";
import { SET_MESSAGE } from "../../../provider/actions";

const Message = ({ message, onChange }) => {
     return (
          <div className={styles["message-container"]}
               data-aos="fade-up"
               data-aos-duration="600"
               data-aos-delay="500">
               <div className={styles["message-textarea"]}>
                    <textarea onChange={onChange(SET_MESSAGE)} value={message} placeholder="Write your message" />
               </div>
          </div>
     );
};
export default Message;
