import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp
} from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    // make reference to a collection you want to save the doc to
    const id = localStorage.getItem("user_id");
    const collectionRef = projectFirestore.collection(id);

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(Math.round(percentage));
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
        // now, save the URL to Firestore(database). Right now it's saved in storage
        // We want to make a document representing the image inside our DB with the image URL
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt, memory: "" });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
