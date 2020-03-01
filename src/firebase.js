import Rebase from "re-base";
import firebase from "firebase";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyBBdfX81oAFyKjwv2so6ddZ6_z1JJZupqE",
    authDomain: "rudaiana-website.firebaseapp.com",
    databaseURL: "https://rudaiana-website.firebaseio.com",
    projectId: "rudaiana-website",
    storageBucket: "rudaiana-website.appspot.com",
    messagingSenderId: "203192338745",
    appId: "1:203192338745:web:53ca690687f53941"
  };

const app = firebase.initializeApp(config);
const storage = firebase.storage();

const base = Rebase.createClass(app.database());
// export {base , app , storage}
export {base , app , storage , firebase as default}