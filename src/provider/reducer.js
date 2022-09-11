import { SET_EMAIL, SET_NAME, SET_MESSAGE, SUBMIT, RESET } from "./actions";
export const initValue = {
     email: "",
     name: "",
     message: "",
};
const reducer = (state, action) => {
     switch (action.type) {
          case SET_EMAIL:
               return {
                    ...state,
                    email: action.email
               }
          case SET_NAME:
               return {
                    ...state,
                    name: action.name
               }
          case SET_MESSAGE:
               return {
                    ...state,
                    message: action.message
               }
          case SUBMIT:
               return {
                    ...state,
                    email: action.email,
                    name: action.name,
                    message: action.message,
               };
          case RESET:
               return {
                    ...state,
                    email: action.email,
                    name: action.name,
                    message: action.message,
               };
     }
};
export default reducer;