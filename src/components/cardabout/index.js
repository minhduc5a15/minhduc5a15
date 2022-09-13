import Card from "../card";
import Heart from "./heart";
import Avatar from "./avatar";
import Box from "../card/box";
import Social from "./social";
import Wrapper from "./wrapper";
import NameContainer from "./name";

const CardAbout = () => {
     return (
          <Card data-aos="fade-up">
               <Box>
                    <Heart />
                    <Avatar />
                    <Social social={true} />
                    <NameContainer />
               </Box>
               <Box>
                    <Wrapper />
                    <Social />
               </Box>
          </Card>
     );
};
export default CardAbout;
