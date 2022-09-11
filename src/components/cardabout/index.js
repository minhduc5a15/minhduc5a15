import Card from "../card";
import Heart from "./heart";
import Avatar from "./avatar";
import Box from "../card/box";
import Button from "./button";
import Wrapper from "./wrapper";
import Contact  from "./contact";
import NameContainer from "./name";

const CardAbout = () => {
     return (
          <Card data-aos="fade-up">
               <Box>
                    <Heart />
                    <Avatar />
                    <Contact />
                    <NameContainer />
               </Box>
               <Box>
                    <Wrapper />
                    <Button />
               </Box>
          </Card>
     );
};
export default CardAbout;
