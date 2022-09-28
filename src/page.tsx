import React from "react";
import Cardlist from "./components/cardlist";
import Phone from "@mui/icons-material/Phone";
import CardAbout from "./components/cardabout";
import HomeIcon from "@mui/icons-material/Home";
import CardContact from "./components/cardcontact";
import Article from "@mui/icons-material/ArticleOutlined";
interface Props {
     title: string;
     icon: JSX.Element;
     card: JSX.Element;
};
const Page = (value : number) => {
     var props: Props;
     switch (value) {
          case 0:
               props = {
                    title: "About",
                    icon: <HomeIcon />,
                    card: <CardAbout />,
               };
               return props;
          case 1:
               props = {
                    title: "My skill",
                    icon: <Article />,
                    card: <Cardlist />,
               };
               return props;
          case 2:
               props = {
                    title: "Contact",
                    icon: <Phone />,
                    card: <CardContact />,
               };
               return props;
          default:
               return {};
     };
};
export default Page;
