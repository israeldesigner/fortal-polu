/* eslint-disable no-undef */
import * as dotenv from 'dotenv'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocFromCache,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// configuração firebase
const email = 'israeldesigner@icloud.com'
const password = '6klzKIaA*hfKTa31'
const firebaseConfig = {
  apiKey: 'AIzaSyAl3Z8cGE62ZNFc__yLCktbvqyhXTVsGi8',
  authDomain: 'moqatrama-prod.firebaseapp.com',
  projectId: 'moqatrama-prod',
  storageBucket: 'moqatrama-prod.appspot.com',
  messagingSenderId: 1058408189763,
  appId: '1:1058408189763:web:fdac184953248dde9d69f6',
  measurementId: 'G-CWNNPY01JF',
}

// inicializa o Firebase
const app = initializeApp(firebaseConfig)

// Inicializando serviço de Firestore
const db = getFirestore(app)
const dataReal = collection(db, 'system-1')
// const docRef = doc(db, 'system-1')
// const querySnapshot = getDocs(collection(db, "system-1'"))

// inicializa a autenticação
const auth = getAuth(app)

const checkAut = async () => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log(user)
      onSnapshot(dataReal, (snapshot) => {
        const docs = []
        snapshot.forEach((doc) => {
          docs.push(doc.data())
          console.log(docs)
        })
      })
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
    })
}

checkAut()
