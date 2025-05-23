import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmfpV_ntzb8JXd7vsOPtK0TYfYTGH2LlQ",
  authDomain: "revathi-duba.firebaseapp.com",
  projectId: "revathi-duba",
  storageBucket: "revathi-duba.firebasestorage.app",
  messagingSenderId: "243138013755",
  appId: "1:243138013755:web:42a4584d140a872e12ca1e",
  measurementId: "G-B063KWXXDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication functions
export const loginAdmin = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// Firestore functions
export const saveContactForm = async (formData: any) => {
  try {
    const docRef = await addDoc(collection(db, "contactRequests"), {
      ...formData,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving form data:", error);
    throw error;
  }
};

export const getContactForms = async () => {
  try {
    const q = query(collection(db, "contactRequests"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const forms = [];
    querySnapshot.forEach((doc) => {
      forms.push({ id: doc.id, ...doc.data() });
    });
    return forms;
  } catch (error) {
    console.error("Error fetching form data:", error);
    throw error;
  }
};
