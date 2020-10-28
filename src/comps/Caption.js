import React, { useState } from "react";
import addCaption from "../hooks/addCaption";
import Plus from "../images/add.png";
import { motion } from "framer-motion";

const Caption = ({ current, captionId, setCaptionId }) => {
  const [input, setInput] = useState(current);

  function handleClick(e) {
    if (e.target.classList.contains("backdrop")) {
      setCaptionId(null);
    }
  }

  function handleChange(e) {
    const { value } = e.target;
    setInput(value);
  }

  function handleAdd() {
    addCaption(captionId, input);
    setCaptionId(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="backdrop"
      onClick={handleClick}
    >
      <textarea
        placeholder="Add a memory!"
        className="ui-autocomplete-input"
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
