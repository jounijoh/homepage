

import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"




const firebaseConfig = {

  apiKey: process.env.REACT_APP_APIKEY,

  authDomain: process.env.REACT_APP_AUTHDOMAIN,

  projectId: process.env.REACT_APP_PROJECT_ID,

  storageBucket: process.env.REACT_APP_STORAGEBUCKET,

  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

  appId: process.env.REACT_APP_APP_ID,

  databaseURL: process.env.REACT_APP_DATABASE_URL

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
