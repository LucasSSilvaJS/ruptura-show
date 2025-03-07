
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCb3zSgeOApOKptjPXdrXQzVjNwDRDff6U",
    authDomain: "ruptura-ed665.firebaseapp.com",
    projectId: "ruptura-ed665",
    storageBucket: "ruptura-ed665.firebasestorage.app",
    messagingSenderId: "554029243268",
    appId: "1:554029243268:web:6b2332446dd7437e9d1bd1"
}

const initializeFirebase = initializeApp(firebaseConfig)

const db = getFirestore(initializeFirebase)
const auth = getAuth(initializeFirebase)

export { db, auth }
