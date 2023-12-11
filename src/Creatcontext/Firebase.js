import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, addDoc, collection ,  getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes , getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBJa2gjeVHZ1QzayE0vSgY97QC-YjpjDKk",
  authDomain: "jasmin-web.firebaseapp.com",
  projectId: "jasmin-web",
  storageBucket: "jasmin-web.appspot.com",
  messagingSenderId: "231318498714",
  appId: "1:231318498714:web:4283e3fa692c1febf79e23",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleprovider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setuser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setuser(user);
      } else {
        setuser(null);
      }
    });
  }, []);

  const signupuser = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginuser = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const googlelogin = () => {
    signInWithPopup(firebaseAuth, googleprovider);
  };

  const isLoggedin = user ? true : false;

  const handlelisting = async (
    firstName,
    lastName,
    address,
    address2,
    city,
    state,
    zip
  ) => {
    return await addDoc(collection(firestore, "oder"), {
      firstName,
      lastName,
      address,
      address2,
      city,
      state,
      zip,
      userId: user.uid,
      userEmail: user.email,
    });
  };

  const addproduct = async (id, title, dis, prize, rating, cover) => {
    const imageref = ref(storage, `product/images/${Date.now()}-${cover.name}`);
    const uplodres = await uploadBytes(imageref, cover);
    const imageUrl = await getDownloadURL(imageref);
    return await addDoc(collection(firestore, "product"), {
      id,
      title,
      dis,
      prize,
      rating,
      imageUrl: uplodres.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
    });
  };

  const productlist = () =>{
    return getDocs(collection(firestore, "product"))
  }

  const downloadurl = (path) =>{
return getDownloadURL(ref(storage, path));
  }

  return (
    <FirebaseContext.Provider
      value={{
        signupuser,
        loginuser,
        googlelogin,
        isLoggedin,
        handlelisting,
        addproduct,
        productlist,
        downloadurl
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
export const app = initializeApp(firebaseConfig);