import { doc, deleteDoc } from "firebase/firestore";
import fireStore from "../firebaseInit";

const deleteDocument = async (diaryId) => {
  await deleteDoc(doc(fireStore.fireStore, "diaryList", `diary_${diaryId}`));
};

export default deleteDocument;
