import * as firebase from "firebase/app";
import { projectFirestore } from "../firebase/config";

const deleteTag = (id, tag) => {
  const userId = localStorage.getItem("user_id");
  const collectionRef = projectFirestore.collection(userId);
  collectionRef
    .doc(id)
    .update({
      tags: firebase.firestore.FieldValue.arrayRemove(tag)
    })
    .then(function () {})
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};

export default deleteTag;
