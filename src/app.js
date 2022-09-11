import Page from "./page.tsx";
import disable from "./setting";
import Section from "./section";
import Header from "./components/header";
import Container from "./components/container";
import { Fragment, useState, useEffect } from "react";

const App = () => {
     const [icon, setIcon] = useState(0);
     useEffect(() => {
          disable();
     }, []);
     const onClick = () => {
          setIcon(icon + 1);
     };
     return (
          <Fragment>
               <Section>
                    <Header onClick={onClick} icon={icon} page={Page} />
                    {Page(icon % 3).card}
               </Section>
               <Container />
          </Fragment>
     );
};
export default App;

