import TypingBox from "./typingbox";
import Typewriter from "typewriter-effect";

const Typing = () => {
     const introList = ["My name is Duc.", "I was born in 2005.", "I'm student.", "I'm web developer.", "I'm AI Engineer."];
     return (
          <TypingBox>
               <Typewriter options={{
                    strings: introList,
                    autoStart: true,
                    loop: true,
                    delay: 50,
               }} />
          </TypingBox>
     );
};
export default Typing;
