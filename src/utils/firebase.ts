import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";

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
    // Generate a professional response template for the admin
    const adminResponseTemplate = {
      to: formData.email,
      name: formData.name,
      subject: `Re: ${formData.subject}`,
      responseTemplate: `Dear ${formData.name},

Thank you for reaching out regarding "${formData.subject}".

I have received your inquiry and appreciate your interest. I will review the details you've shared and get back to you with a thoughtful response as soon as possible.

If you have any urgent matters, please feel free to contact me directly at +91 8099794356.

Best regards,
Dr. Revathi Duba
Principal & Academic Director
KIET Group of Institutions`
    };

    // Save both user message and admin response template
    const docRef = await addDoc(collection(db, "contactRequests"), {
      ...formData,
      timestamp: new Date(),
      adminResponseTemplate: adminResponseTemplate,
      status: "unread"
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error saving form data:", error);
    throw error;
  }
};

/**
 * Set up real-time listener for contact forms
 */
export const getContactFormsRealtime = (onUpdate, onError) => {
  try {
    const formsRef = collection(db, "contactRequests");
    const q = query(formsRef, orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const forms = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        onUpdate(forms);
        
        // Check for new submissions since last update
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added" && change.doc.data().timestamp?.toDate() > new Date(Date.now() - 10000)) {
            // Only notify for very recent submissions (last 10 seconds)
            onUpdate(forms, {
              id: change.doc.id,
              ...change.doc.data()
            });
          }
        });
      },
      (error) => {
        console.error("Real-time contact forms error:", error);
        onError(error);
      }
    );
    
    return unsubscribe;
  } catch (error) {
    console.error("Error setting up real-time listener:", error);
    onError(error);
    return () => {}; // Return empty function as fallback
  }
};

// Keep the existing function for backward compatibility
export const getContactForms = async () => {
  try {
    const formsRef = collection(db, "contactRequests");
    const q = query(formsRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching contact forms:", error);
    throw error;
  }
};

// Add functions for deleting and updating form submissions
export const deleteContactForm = async (id: string) => {
  try {
    const docRef = doc(db, "contactRequests", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting form data:", error);
    throw error;
  }
};

export const updateContactForm = async (id: string, data: any) => {
  try {
    const docRef = doc(db, "contactRequests", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error updating form data:", error);
    throw error;
  }
};
