import App from "./app";
import React from "react";
import GlobalStyles from "./styles";
import ReactDOM from "react-dom/client";
import Provider from "./provider/provider";
const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(
     <React.StrictMode>
          <Provider>
               <GlobalStyles>
                    <App />
               </GlobalStyles>
          </Provider>
     </React.StrictMode>
);
