import React from "react";
import deletePic from "../hooks/deletePic";
import { motion } from "framer-motion";

const Delete = ({ id, setId }) => {
  function handleClick(e) {
    if (e.target.classList.contains("backdrop")) {
      setId(null);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="backdrop"
      onClick={handleClick}
    >
      <div className="delete-text">Sure you want to delete this picture?</div>
      <button className="cancel-button" onClick={() => setId(null)}>
        Cancel
      </button>
      <button
        className="delete-button"
        onClick={() => {
          deletePic(id);
          setId(null);
        }}
      >
        Delete
      </button>
    </motion.div>
  );
};

export default Delete;
