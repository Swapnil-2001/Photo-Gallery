import React, { useState } from "react";
import addTags from "../hooks/addTags";
import Plus from "../images/add.png";
import { motion } from "framer-motion";
import { useStateValue } from "../providers/StateProvider";

const Tag = () => {
  const [{ tagId }, dispatch] = useStateValue();
  const [input, setInput] = useState("");

  function handleClick(e) {
    if (e.target.classList.contains("backdrop")) {
      dispatch({
        type: "SET_TAG_ID",
        tagId: null
      });
    }
  }

  function handleChange(e) {
    const { value } = e.target;
    setInput(value);
  }

  function handleAdd() {
    if (input.length) {
      addTags(tagId, input);
    }
    dispatch({
      type: "SET_TAG_ID",
      tagId: null
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
