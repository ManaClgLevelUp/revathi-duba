import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { 
  addDoc, collection, orderBy, onSnapshot, query, 
  getDoc, getDocs, updateDoc, doc, deleteDoc, serverTimestamp,
  getFirestore, where
} from 'firebase/firestore';

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

/**
 * Gallery Management Functions
 */
export const saveGalleryItem = async (galleryItem) => {
  try {
    const docRef = await addDoc(collection(db, "galleryItems"), {
      ...galleryItem,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving gallery item:", error);
    throw error;
  }
};

export const getGalleryItems = async () => {
  try {
    const galleryRef = collection(db, "galleryItems");
    const q = query(galleryRef, orderBy("timestamp", "desc"));
    
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return items;
  } catch (error) {
    console.error("Error in getGalleryItems:", error);
    throw error;
  }
};

export const updateGalleryItem = async (id, data) => {
  try {
    const galleryRef = doc(db, "galleryItems", id);
    await updateDoc(galleryRef, {
      ...data,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error updating gallery item:", error);
    throw error;
  }
};

export const deleteGalleryItem = async (id) => {
  try {
    await deleteDoc(doc(db, "galleryItems", id));
    return true;
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    throw error;
  }
};

export const getGalleryItemsRealtime = (onUpdate, onError) => {
  try {
    const galleryRef = collection(db, "galleryItems");
    const q = query(galleryRef, orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Check for changes
        snapshot.docChanges().forEach((change) => {
          const docData = change.doc.data();
          const changeData = {
            id: change.doc.id,
            _changeType: change.type, // added, modified, removed
            ...docData
          };
          
          // Only notify for recent changes - safely check for timestamp
          const docTimestamp = docData?.timestamp?.toDate?.() || new Date();
          const isRecent = (new Date().getTime() - docTimestamp.getTime()) < 5000; // 5 seconds
          
          if (isRecent) {
            onUpdate(items, changeData);
          }
        });
        
        onUpdate(items);
      },
      (error) => {
        console.error("Error getting gallery items in realtime:", error);
        if (onError) onError(error);
      }
    );
    
    return unsubscribe;
  } catch (error) {
    console.error("Error in getGalleryItemsRealtime:", error);
    if (onError) onError(error);
    return () => {};
  }
};

/**
 * Collection Management Functions
 */
export const saveGalleryCollection = async (collectionData) => {
  try {
    const docRef = await addDoc(collection(db, "galleryCollections"), {
      ...collectionData,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving collection:", error);
    throw error;
  }
};

export const getGalleryCollections = async () => {
  try {
    const collectionRef = collection(db, "galleryCollections");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    
    const snapshot = await getDocs(q);
    const collections = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return collections;
  } catch (error) {
    console.error("Error in getGalleryCollections:", error);
    throw error;
  }
};

export const getGalleryCollectionsRealtime = (onUpdate, onError) => {
  try {
    const collectionRef = collection(db, "galleryCollections");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const collections = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Check for changes
        snapshot.docChanges().forEach((change) => {
          const docData = change.doc.data();
          const changeData = {
            id: change.doc.id,
            _changeType: change.type, // added, modified, removed
            ...docData
          };
          
          // Only notify for recent changes - safely check for timestamp
          const docTimestamp = docData?.timestamp?.toDate?.() || new Date();
          const isRecent = (new Date().getTime() - docTimestamp.getTime()) < 5000; // 5 seconds
          
          if (isRecent) {
            onUpdate(collections, changeData);
          }
        });
        
        onUpdate(collections);
      },
      (error) => {
        console.error("Error getting gallery collections in realtime:", error);
        if (onError) onError(error);
      }
    );
    
    return unsubscribe;
  } catch (error) {
    console.error("Error in getGalleryCollectionsRealtime:", error);
    if (onError) onError(error);
    return () => {};
  }
};

/**
 * Delete a gallery collection and all its items
 */
export const deleteGalleryCollection = async (collectionId) => {
  try {
    if (!collectionId) {
      throw new Error("Collection ID is required for deletion");
    }
    
    // First, fetch all items in this collection
    const itemsRef = collection(db, "galleryItems");
    const q = query(
      itemsRef, 
      where("collectionId", "==", collectionId)
    );
    
    const snapshot = await getDocs(q);
    
    // Delete all items in the collection
    const itemDeletePromises = snapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    
    // Wait for all item deletions to complete
    await Promise.all(itemDeletePromises);
    
    // Then delete the collection itself
    const collectionRef = doc(db, "galleryCollections", collectionId);
    await deleteDoc(collectionRef);
    
    return {
      success: true,
      itemsDeleted: snapshot.docs.length
    };
  } catch (error) {
    console.error("Error deleting gallery collection:", error);
    throw error;
  }
};

export const getCollectionItems = async (collectionId) => {
  try {
    if (!collectionId) {
      throw new Error("Collection ID is required");
    }
    
    const itemsRef = collection(db, "galleryItems");
    
    // Use only the where clause without orderBy to avoid composite index requirements
    const q = query(
      itemsRef, 
      where("collectionId", "==", collectionId)
      // Removed orderBy to fix the index error
    );
    
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.log(`No items found for collection: ${collectionId}`);
    }
    
    // Sort the results in memory after fetching them
    const items = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Add explicit timestamp handling for TypeScript
        timestamp: data.timestamp || null
      };
    });
    
    // Sort by timestamp in descending order (newest first)
    items.sort((a, b) => {
      const timeA = a.timestamp?.toDate?.() || 0;
      const timeB = b.timestamp?.toDate?.() || 0;
      return timeB - timeA;
    });
    
    return items;
  } catch (error) {
    console.error(`Error in getCollectionItems for collectionId ${collectionId}:`, error);
    throw error;
  }
};
