import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore/lite'
import { getAuth, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAk5wUrkQHxCfx32npknKTbxeX0Ptfn13U',
  authDomain: 'vanliv.firebaseapp.com',
  projectId: 'vanliv',
  storageBucket: 'vanliv.appspot.com',
  messagingSenderId: '599786397122',
  appId: '1:599786397122:web:acaf098779ab21d2420a5b',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const vansCollectionRef = collection(db, 'vans')

export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef)
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  return vans
}

export async function getVan(id) {
  const docRef = doc(db, 'vans', id)
  const snapshot = await getDoc(docRef)
  return {
    ...snapshot.data(),
    id: snapshot.id,
  }
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where('hostId', '==', auth.currentUser.uid))
  const snapshot = await getDocs(q)
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  return vans
}

export async function authSignOut() {
  signOut(auth)
}

export async function addNewVan(data) {
  const user = auth.currentUser.uid
  try {
    const docRef = await addDoc(collection(db, 'vans'), {
      description: data.description,
      hostId: user,
      imageUrl: data.imageUrl,
      name: data.name,
      price: data.price,
      type: data.type,
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export async function deleteDocument(id) {
  await deleteDoc(doc(db, 'vans', id))
}
