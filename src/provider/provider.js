import Context from "./context";
import { SUBMIT } from "./actions";
import { useReducer, useState } from "react";
import reducer, { initValue } from "./reducer";
import AddDocument from "../firebase/document";
const Provider = ({ children }) => {
     const [state, dispatch] = useReducer(reducer, initValue);
     const [count, setCount] = useState(0);
     const [open, setOpen] = useState(false);
     const submit = (email, name, message) => {
          dispatch({
               type: SUBMIT,
               email: email,
               name: name,
               message: message,
          });
          AddDocument("mail", email, {
               email: email,
               name: name,
               message: message,
          });
     };
     return <Context.Provider value={{state, dispatch, open, setOpen, submit, count, setCount}}>{children}</Context.Provider>
};
export default Provider;