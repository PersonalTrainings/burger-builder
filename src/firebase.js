import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDS6ROlvggkPNK1k-cw9M4CNggWdrl6CqQ",
  authDomain: "react-my-burger-97087.firebaseapp.com",
  databaseURL: "https://react-my-burger-97087.firebaseio.com",
  projectId: "react-my-burger-97087",
  storageBucket: "react-my-burger-97087.appspot.com",
  messagingSenderId: "179354220809"
};

export const firebaseApp = firebase.initializeApp(config);
export const ingredientsRef = firebase.database().ref('ingredients');
export const ordersRef = firebase.database().ref('orders');