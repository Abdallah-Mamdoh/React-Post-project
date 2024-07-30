import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9CNV5QsY-6guOvXXLtpzLQmdhWhSsE1c",
  authDomain: "posting-react-project.firebaseapp.com",
  projectId: "posting-react-project",
  storageBucket: "posting-react-project.appspot.com",
  messagingSenderId: "684107688140",
  appId: "1:684107688140:web:7648dd8644e6efec32fa69"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore(app);
