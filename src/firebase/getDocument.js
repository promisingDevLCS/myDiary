import { collection, getDocs } from "firebase/firestore";
import firebase from "../firebaseInit";

const getDocument = async () => {
  const diaryList = [];

  const querySnapshot = await getDocs(
    collection(firebase.fireStore, "diaryList")
  );
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  //   diaryList.push(doc.data());
  // });

  return querySnapshot;
};

export default getDocument;
