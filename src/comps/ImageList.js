import React from 'react';
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import Delete from "../images/x-button.png";
import Caption from "../images/post-it.png";
import Picture from "../images/picture.png";
import Edit from "../images/pencil.png";
import Add from "../images/addtag.png";

function ImageList({
  flipped,
  setFlipped,
  setCurrent,
  setCaptionId,
  docs,
  setId,
  setTagId,
  deleteTag,
  setSelected
}) {
  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc, index) => (
          <div key={doc.id}>
            <ReactCardFlip isFlipped={flipped[index]}>
              <>
                <motion.div
                  layout
                  id={doc.id}
                  className="img-wrap"
                  onClick={(e) => {
                    if (e.target.classList.contains("img")) {
                      setSelected(doc.url);
                    }
                  }}
                >
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    src={doc.url}
                    className="img"
                    alt="myPics"
                  />
                </motion.div>
                {doc.createdAt && (
                  <div className="date-created">
                    {doc.createdAt.toDate().getDate()}.
                    {doc.createdAt.toDate().getMonth() + 1}.
                    {doc.createdAt.toDate().getFullYear()}
                  </div>
                )}
                <div
                  onClick={() => {
                    setCurrent(doc.memory);
                    setCaptionId(doc.id);
                  }}
                  className="menu-item"
                  style={{ color: "#595b83" }}
                >
                  <img src={Edit} alt="edit" className="icons" />
                  Add/Edit Caption
                </div>
                <div
                  onClick={() => {
                    if (flipped[index]) {
                      const arr = [...flipped];
                      arr[index] = false;
                      setFlipped(arr);
                    } else {
                      const arr = new Array(flipped.length).fill(false);
                      arr[index] = true;
                      setFlipped(arr);
                    }
                  }}
                  className="menu-item"
                  style={{ color: "#16697a" }}
                >
                  <img src={Caption} alt="caption" className="icons" />
                  View Caption
                </div>
                <div
                  onClick={() => {
                    setId(doc.id);
                  }}
                  className="menu-item"
                  style={{ color: "#af2d2d" }}
                >
                  <img src={Delete} alt="delete" className="icons" />
                  Delete
                </div>
                <div
                  className="scrollbar"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    overflow: "scroll"
                  }}
                >
                  {doc.tags.length < 5 && (
                    <span
                      style={{
                        marginRight: "6px",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        setTagId(doc.id);
                      }}
                    >
                      <img src={Add} style={{ width: "24px" }} alt="add" />
                    </span>
                  )}
                  {doc.tags.length === 0 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "0.8rem",
                        fontWeight: "600"
                      }}
                    >
                      Add tags!
                    </div>
                  )}
                  {doc.tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        height: "20px"
                      }}
                    >
                      {doc.tags.map((tag, index) => (
                        <div className="tags" key={index}>
                          <div className="tag">{tag}</div>
                          <span
                            onClick={() => {
                              deleteTag(doc.id, tag);
                            }}
                            style={{
                              fontSize: "0.6rem",
                              marginLeft: "5px",
                              cursor: "pointer"
                            }}
                          >
                            x
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
              <div className="caption-div">
                <div className="caption-text">{doc.memory}</div>
                <div
                  onClick={() => {
                    setCurrent(doc.memory);
                    setCaptionId(doc.id);
                  }}
                  className="menu-item"
                  style={{ color: "#595b83" }}
                >
                  <img src={Edit} alt="edit" className="icons" />
                  Add/Edit Caption
                </div>
                <div
                  onClick={() => {
                    const arr = [...flipped];
                    arr[index] = !arr[index];
                    setFlipped(arr);
                  }}
                  className="menu-item"
                  style={{ color: "#41aea9" }}
                >
                  <img src={Picture} alt="pic" className="icons" />
                  View Image
                </div>
              </div>
            </ReactCardFlip>
          </div>
        ))}
    </div>
  )
}

export default ImageList;