import React, { useEffect } from 'react';
import './App.css';
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult, signOut, onAuthStateChanged } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { browserStorage, userInfoKey } from './BrowserStorage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

function App() {

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        if(!browserStorage.getItem(userInfoKey)){
          browserStorage.setItem(userInfoKey, user);
          window.location.reload();
        }
        // ...
      } else {
        console.log('user is logged out');
        // User is signed out
        // ...
      }
    });
  })

  return (
    <div className="App">
      <div align="left" style={{backgroundColor: 'grey', position: 'absolute', bottom: '0px', width: '100vw'}}>
      { browserStorage.getItem(userInfoKey) && <button onClick={()=>{
        signOut(auth).then(() => {
          // Sign-out successful.
          browserStorage.removeItem(userInfoKey);
          window.location.reload();
        }).catch((error) => {
          // An error happened.
        });
      }}>out</button>}
     {!browserStorage.getItem(userInfoKey) && <button onClick={()=>{
      signInWithRedirect(auth, provider);
      }}> signin</button>
    }
      </div>
    </div>
  );
}

export default App;
