import "firebase/compat/database";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);
const store = firebase.firestore();
const db = firebase.database();
const rootRef = {
     "like": db.ref("like"),
     "list": db.ref("list"),
     "meteor": db.ref("meteor"),
     "view": db.ref("view"),
};
export { rootRef, db, store};
export default firebase;
