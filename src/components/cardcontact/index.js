import Form from "./form";
import Card from "../card";
import Alert from "./alert";
import Header from "./header";
import { Fragment } from "react";

const CardContact = () => {
     return (
          <Fragment>
               <Card>
                    <Header />
                    <Form />
               </Card>
               <Alert />
          </Fragment>
     );
};

export default CardContact;
