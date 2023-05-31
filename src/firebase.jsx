// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCXzztWiz_GvyOLTurvnsZfHrj2DssLs4g",
	authDomain: "hometopia-d224f.firebaseapp.com",
	projectId: "hometopia-d224f",
	storageBucket: "hometopia-d224f.appspot.com",
	messagingSenderId: "471415467397",
	appId: "1:471415467397:web:67b0d3c0122332a384e8ec",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
