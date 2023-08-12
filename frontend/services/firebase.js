import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdO2KigDdHmpZvhZ8uDTcN8MArOcKykNg",
  authDomain: "ploteye-28ce3.firebaseapp.com",
  projectId: "ploteye-28ce3",
  storageBucket: "ploteye-28ce3.appspot.com",
  messagingSenderId: "44110657871",
  appId: "1:44110657871:web:48f40a740f29c6f8d0ed3a",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
