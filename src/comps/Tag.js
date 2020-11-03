import React, { useState } from "react";
import addTags from "../hooks/addTags";
import Plus from "../images/add.png";
import { motion } from "framer-motion";

const Tag = ({ tagId, setTagId }) => {
  const [input, setInput] = useState("");

  function handleClick(e) {
    if (e.target.classList.contains("backdrop")) {
      setTagId(null);
    }
  }

  function handleChange(e) {
    const { value } = e.target;
    setInput(value);
  }

  function handleAdd() {
    addTags(tagId, input);
    setTagId(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="backdrop"
      onClick={handleClick}
    >
      <textarea
        placeholder="Add a tag!"
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

export default Tag;
