import { collection, addDoc } from "firebase/firestore";
import firebase from "../firebaseInit";

const addDocument = async (id, createdDate, emotionId, title, content) => {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(firebase.fireStore, "/diary"), {
    id: id,
    createdDate: createdDate,
    emotionId: emotionId,
    title: title,
    content: content,
  });
};

// export default addDocument;
