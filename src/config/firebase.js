
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyCdK1NNkubmXB_ocEVHUpBHvSujUpMvCDQ",
  authDomain: "delivery-iad.firebaseapp.com",
  projectId: "delivery-iad",
  storageBucket: "delivery-iad.appspot.com",
  messagingSenderId: "1080962400494",
  appId: "1:1080962400494:web:584a7afd439a5ad7c873ff"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app)



export {
    auth , database
}
