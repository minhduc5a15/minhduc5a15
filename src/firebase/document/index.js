import firebase, { store } from "..";
const AddDocument = (collection, document, data) => {
     const query = store.collection(collection);
     query.doc(document).set({
          ...data,
          submitAt: firebase.firestore.FieldValue.serverTimestamp(),
     });
};
export default AddDocument;