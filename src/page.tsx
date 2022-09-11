import React from "react";
import Cardlist from "./components/cardlist";
import Phone from "@mui/icons-material/Phone";
import CardAbout from "./components/cardabout";
import HomeIcon from "@mui/icons-material/Home";
import CardContact from "./components/cardcontact";
import Article from "@mui/icons-material/ArticleOutlined";
interface Obj {
     title: string;
     icon: JSX.Element;
     card: JSX.Element;
};
const Page = (mod : number) => {
     var result: Obj = {
          title: "",
          icon: <></>,
          card: <></>,
     };
     switch (mod) {
          case 0:
               result = {
                    title: "About",
                    icon: <HomeIcon />,
                    card: <CardAbout />,
               };
               return result;
          case 1:
               result = {
                    title: "My skill",
                    icon: <Article />,
                    card: <Cardlist />,
               };
               return result;
          case 2:
               result = {
                    title: "Contact",
                    icon: <Phone />,
                    card: <CardContact />,
               };
               return result;
          default:
               return {};
     };
};
export default Page;
