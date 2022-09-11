import Meteor from "./meteor";
import Toggle from "./toggle";
import Bubbles from "./bubbles";
import { Fragment, memo } from "react";
const Container = () => {
     return (
          <Fragment>
               <Bubbles />
               <Toggle />
               <Meteor />
          </Fragment>
     );
};
export default memo(Container);
