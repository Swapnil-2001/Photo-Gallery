import React, { useState } from "react";
import addCaption from "../hooks/addCaption";
import Plus from "../images/add.png";
import { motion } from "framer-motion";
import { useStateValue } from "../providers/StateProvider";

const Caption = () => {
  const [{ captionId, currentCaption }, dispatch] = useStateValue();
  const [input, setInput] = useState(currentCaption);

  function handleClick(e) {
    if (e.target.classList.contains("backdrop")) {
      dispatch({
        type: "SET_CAPTION_ID",
        id: null
      });
    }
  }

  function handleChange(e) {
    const { value } = e.target;
    setInput(value);
  }

  function handleAdd() {
    addCaption(captionId, input);
    dispatch({
      type: "SET_CAPTION_ID",
      id: null
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="backdrop"
      onClick={handleClick}
    >
      <textarea
        placeholder="Add a caption / description"
        autoComplete="off"
        aria-autocomplete="list"
        aria-haspopup="true"
        onChange={handleChange}
        value={input}
      ></textarea>
      <div onClick={handleAdd}>
        <img
          src={Plus}
          className="add-icon"
          style={{ border: "none", boxShadow: "none" }}
          alt="plus"
        />
      </div>
    </motion.div>
  );
};

export default Caption;
