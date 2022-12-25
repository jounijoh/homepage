

import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"



const firebaseConfig = {

  apiKey: "AIzaSyCsgdKrhuaq8MlTRogeKOzM5XASe4l-VS4",

  authDomain: "digitekniikatlopputyo.firebaseapp.com",

  projectId: "digitekniikatlopputyo",

  storageBucket: "digitekniikatlopputyo.appspot.com",

  messagingSenderId: "776910205785",

  appId: "1:776910205785:web:6c199a4246f98ff7b41248",

  databaseURL: "https://digitekniikatlopputyo-default-rtdb.europe-west1.firebasedatabase.app"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
