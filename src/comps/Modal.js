import React from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../providers/StateProvider";

const Modal = () => {
  const [{ selectedImage }, dispatch] = useStateValue();
  function handleClick(e) {
    if (e.target.classList.contains("backdrop")) {
      dispatch({
        type: "SET_SELECTED_IMAGE",
        image: null
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
      <motion.img
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        src={selectedImage}
        alt="enlarged"
        style={{ backgroundColor: "white" }}
      />
    </motion.div>
  );
};

export default Modal;
