import { doc, updateDoc } from "firebase/firestore";
import firebase from "../firebaseInit";

const updateDocument = async (diaryId, newState) => {
  const diaryRef = doc(firebase.fireStore, "diaryList", `diary_${diaryId}`);
  await updateDoc(diaryRef, {
    ...newState,
  });
};

export default updateDocument;
