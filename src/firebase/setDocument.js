import { doc, setDoc } from "firebase/firestore";
import firebase from "../firebaseInit";

const setDocument = async (id, createdDate, emotionId, title, content) => {
  // Add a new document in collection "cities"
  // ID 설정을 해줘야 함
  await setDoc(doc(firebase.fireStore, "/diaryList", `diary_${id}`), {
    id: id,
    createdDate: createdDate,
    emotionId: emotionId,
    title: title,
    content: content,
  });
};

export default setDocument;
