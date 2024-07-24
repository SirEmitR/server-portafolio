import { collection, addDoc } from "firebase/firestore";
import app ,{ db } from "./firebase.js";

const collname = "messages";
const collref = collection(db, collname);
const APP_NAME = "[DEFAULT]";

export async function checkConnection() {
    try {
        console.log("Checking connection to Firestore");
        return app.name === APP_NAME
    } catch (e) {
        console.error("Error connecting to Firestore: ", e);
        throw e;
    }
}

export async function createMessage(message) {
    try {
        const docRef = await addDoc(collref, message);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
}