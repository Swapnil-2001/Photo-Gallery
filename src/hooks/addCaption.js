import { projectFirestore } from "../firebase/config";

const addCaption = (id, caption) => {
  const userId = localStorage.getItem("user_id");
  const collectionRef = projectFirestore.collection(userId);
  collectionRef
    .doc(id)
    .update({
      memory: caption
    })
    .then(function () {})
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
};

export default addCaption;
