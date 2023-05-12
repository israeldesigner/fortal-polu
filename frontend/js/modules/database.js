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
const email = '*'
const password = '*'
const firebaseConfig = {
  apiKey: '*',
  authDomain: '*',
  projectId: '*',
  storageBucket: '*',
  messagingSenderId: '*',
  appId: '*',
  measurementId: '*',
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
