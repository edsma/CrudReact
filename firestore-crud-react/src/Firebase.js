import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCw_GzE3t1faMpFOadhVJc2byGjnt-pDeA",
    authDomain: "fb-crud-react-82b7a.firebaseapp.com",
    projectId: "fb-crud-react-82b7a",
    storageBucket: "fb-crud-react-82b7a.appspot.com",
    messagingSenderId: "325122001596",
    appId: "1:325122001596:web:bb9ea28b567aa380cd1eb9"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
    export const db = app; 
