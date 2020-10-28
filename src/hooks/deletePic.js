import { projectFirestore } from "../firebase/config";

const deletePic = (id) => {
  const userId = localStorage.getItem("user_id");
  const collectionRef = projectFirestore.collection(userId);
  collectionRef
    .doc(id)
    .delete()
    .then(function () {})
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};

export default deletePic;
