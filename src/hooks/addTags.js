import * as firebase from "firebase/app";
import { projectFirestore } from "../firebase/config";

const addTags = (id, tag) => {
  const userId = localStorage.getItem("user_id");
  const collectionRef = projectFirestore.collection(userId);
  collectionRef
    .doc(id)
    .update({
      tags: firebase.firestore.FieldValue.arrayUnion(tag)
    })
    .then(function () {})
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
};

export default addTags;
