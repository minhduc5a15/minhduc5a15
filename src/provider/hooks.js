import Context from "./context";
import { useContext } from "react";

const useStore = () => {
     return useContext(Context);
};
export default useStore;