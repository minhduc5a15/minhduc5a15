const ApiKey = process.env.REACT_APP_API_KEY;
const AppId = process.env.REACT_APP_APP_ID;
const ProjectID = process.env.REACT_APP_PROJECT_ID;
const MeasurementId = process.env.REACT_APP_MEASUREMENT_ID;
const KeyLocalStorage = process.env.REACT_APP_LOCAL_STORAGE_KEY;
const MessagingSenderId = process.env.REACT_APP_MESSAGING_SENDERLD;

const firebaseConfig = {
     apiKey: `${ApiKey}`,
     authDomain: `${ProjectID}.firebaseapp.com`,
     databaseURL: `https://${ProjectID}-default-rtdb.asia-southeast1.firebasedatabase.app`,
     projectId: `${ProjectID}`,
     storageBucket: `${ProjectID}.appspot.com`,
     messagingSenderId: `${MessagingSenderId}`,
     appId: `${AppId}`,
     measurementId: `${MeasurementId}`,
};
export { firebaseConfig, KeyLocalStorage };
