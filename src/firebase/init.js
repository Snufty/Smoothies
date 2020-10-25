 import firebase from 'firebase'
 import 'firebase/firestore'
 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB2nSCqyVm7nXHfXgbEKnlAbFRNJztCRkM",
    authDomain: "smoothies-7d770.firebaseapp.com",
    databaseURL: "https://smoothies-7d770.firebaseio.com",
    projectId: "smoothies-7d770",
    storageBucket: "smoothies-7d770.appspot.com",
    messagingSenderId: "1028186376677",
    appId: "1:1028186376677:web:95c765fc42f72e0c59c70c",
    measurementId: "G-DDJ7C12K3L"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //export firestore database
  export default firebaseApp.firestore()
  