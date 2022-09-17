import "firebase/compat/database";
import "firebase/compat/firestore";
import { firebaseConfig } from "./config";
import firebase from "firebase/compat/app";

firebase.initializeApp(firebaseConfig);
const store = firebase.firestore();
const db = firebase.database();
const rootRef = {
     "like": db.ref("like"),
     "list": db.ref("list"),
     "meteor": db.ref("meteor"),
     "view": db.ref("view"),
};
export { rootRef, db, store };
export default firebase;
