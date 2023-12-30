import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    zip,
    total,
    updatedQuantities,
    wishlist,
    productsmodalArray,
    productsIdArray,
    cartItems
  ) => {
    return await addDoc(collection(firestore, "Orders"), {
      firstName,
      lastName,
      address,
      address2,
      city,
      state,
      zip,
      total,
      updatedQuantities,
      wishlist,
      productsmodalArray,
      productsIdArray,
      cartItems,
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

  const productlist = () => {
    return getDocs(collection(firestore, "product"));
  };

  const downloadurl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const updateProductPrice = async (productId, newPrice) => {
    const productDoc = doc(firestore, "product", productId);
    await updateDoc(productDoc, { prize: newPrice });
  };

  const logout = async () => {
    await signOut(firebaseAuth);
    setuser(null);
  };

  const saveUserDetails = async (userDetails) => {
    if (!user) {
      console?.error("User not logged in.");
      return;
    }

    const userDocRef = doc(firestore, "users", user.uid);

    try {
      await setDoc(userDocRef, userDetails);
    } catch (error) {
      console.error("Error saving user details:", error.message);
    }
  };

  const getUserDetails = async () => {
    if (!user) {
       console?.error("User not logged in2.");
       return null;
    }

    const userDocRef = doc(firestore, "users", user.uid);

    try {
      const userDoc = await getDoc(userDocRef);
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      return null;
    }
  };

  const updateUserDetails = async (updatedDetails) => {
    if (!user) {
      console.error("User not logged in.");
      return;
    }

    const userDocRef = doc(firestore, "users", user.uid);

    try {
      await updateDoc(userDocRef, updatedDetails);
    } catch (error) {
      console.error("Error updating user details:", error.message);
    }
  };

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
        downloadurl,
        updateProductPrice,
        userEmail: user ? user.email : null,
        logout,
        saveUserDetails,
        getUserDetails,
        updateUserDetails
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export const app = initializeApp(firebaseConfig);
