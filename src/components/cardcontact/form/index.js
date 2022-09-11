import Name from "../name";
import Email from "../email";
import Submit from "../submit";
import Message from "../message";
import { styles } from "../../../styles";
import useStore from "../../../provider/hooks";
import { SET_EMAIL, SET_MESSAGE, SET_NAME } from "../../../provider/actions";
const Form = () => {
     const { state, dispatch, setOpen, submit } = useStore();
     const onChange = (type) => {
          switch (type) {
               case SET_EMAIL:
                    return (e) => {
                         dispatch({
                              type: SET_EMAIL,
                              email: e.target.value,
                         });
                    };
               case SET_NAME:
                    return (e) => {
                         dispatch({
                              type: SET_NAME,
                              name: e.target.value,
                         });
                    };
               case SET_MESSAGE:
                    return (e) => {
                         dispatch({
                              type: SET_MESSAGE,
                              message: e.target.value,
                         });
                    };
               default:
                    return;
          }
     };
     return (
          <form type="submit" onSubmit={(e) => e.preventDefault()} spellCheck="false" className={styles.container}>
               <Email email={state.email} onChange={onChange} />
               <Name name={state.name} onChange={onChange} />
               <Message message={state.message} onChange={onChange} />
               <Submit email={state.email} name={state.name} message={state.message} submit={submit} setOpen={setOpen} />
          </form>
     );
};
export default Form;
