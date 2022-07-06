import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'
import { getAnalytics } from "firebase/analytics"
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
    apiKey: "AIzaSyAN_qJeDwht0ZOKPPUOz5F6bW0g69UdZqE",
    authDomain: "quieromipractica.firebaseapp.com",
    projectId: "quieromipractica",
    storageBucket: "quieromipractica.appspot.com",
    messagingSenderId: "36626373719",
    appId: "1:36626373719:web:f4958bada4b1e1a0251712",
    measurementId: "G-H1X3SPW9P1"
}


const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
// export const analytics = getAnalytics(firebaseApp)
// export const perf = getPerformance(firebaseApp)
export const perf = () => {
    if (typeof window !== "undefined") {
      return getPerformance(firebaseApp)
    } else {
      return null
    }
  }
export const analytics = () => {
    if (typeof window !== "undefined") {
      return getAnalytics(firebaseApp)
    } else {
      return null
    }
  }
// const db = getFirestore(app)
// export default firebaseApp
