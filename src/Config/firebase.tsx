import * as fire from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_DB,
    authDomain: 'supersecretinfohere',
    databaseURL: 'supersecretinfohere',
    projectId: 'supersecretinfohere',
    storageBucket: 'supersecretinfohere',
    messagingSenderId: 'supersecretinfohere',
    appId: 'supersecretinfohere',
    measurementId: 'supersecretinfohere',
};

fire.initializeApp(firebaseConfig);

export const db = fire.firestore();
export const firebase = fire;
