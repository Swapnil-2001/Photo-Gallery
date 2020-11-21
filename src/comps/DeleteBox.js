import React from "react";
import deletePic from "../hooks/deletePic";
import { motion } from "framer-motion";
import { useStateValue } from "../providers/StateProvider";

const Delete = () => {
  const [{ deleteId }, dispatch] = useStateValue();
  function handleClick(e) {
    if (e.target.classList.contains("backdrop")) {
      dispatch({
        type: "SET_DELETE_ID",
        id: null
      });
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
      <button
        className="cancel-button"
        onClick={() => {
          dispatch({
            type: "SET_DELETE_ID",
            id: null
          });
        }}
      >
        Cancel
      </button>
      <button
        className="delete-button"
        onClick={() => {
          deletePic(deleteId);
          dispatch({
            type: "SET_DELETE_ID",
            id: null
          });
        }}
      >
        Delete
      </button>
    </motion.div>
  );
};

export default Delete;
