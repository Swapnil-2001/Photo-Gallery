import React, { useState, useEffect } from "react";
import deleteTag from "../../hooks/deleteTag";
import ScrollButton from "../../hooks/ScrollToTop";
import Blue from "../../images/blue-magnifying.png";
import Sad from "../../images/sweat.png";
import Search from "../../images/loupe.png";
import useFirestore from "../../hooks/useFirestore";
import { motion } from "framer-motion";
import isValidDate from "../../utils/isValidDate";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ImageList from "../ImageList/ImageList";

import { useStateValue } from "../../providers/StateProvider";
import "./ImageGrid.css";

const ImageGrid = ({ date, setDate, tag, setTag }) => {
  const [{ dateSearch, tagSearch }, dispatch] = useStateValue();
  const [copied, setCopied] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState("");
  const [flipped, setFlipped] = useState([]);
  const id = localStorage.getItem("user_id");
  let { docs } = useFirestore(id);
  let tagList = [];
  if (docs) {
    for (let doc of docs) {
      doc.tags.forEach((tag) => {
        if (!tagList.includes(tag)) {
          tagList.push(tag);
        }
      });
    }
  }

  if (tagSearch) {
    let find = tagSearch.toLowerCase();
    docs = docs.filter((doc) => {
      let res = false;
      for (let tag of doc.tags) {
        if (tag.toLowerCase().includes(find)) {
          res = true;
          break;
        }
      }
      return res;
    });
  }

  if (dateSearch.length > 0) {
    docs = docs.filter((doc) => {
      const [day, month, year] = dateSearch;
      if (doc.createdAt) {
        const d = doc.createdAt.toDate();
        return (
          (d.getDate() === parseInt(day, 10) || d.getDate() === day) &&
          d.getMonth() === month - 1 &&
          (d.getFullYear() === year || d.getFullYear() === parseInt(year, 10))
        );
      } else {
        return false;
      }
    });
  }

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (docs.length > 0) {
      const arr = new Array(docs.length).fill(false);
      setFlipped(arr);
      setMessage(null);
    } else {
      if (dateSearch.length > 0) {
        setMessage("No photos on that day!");
      }
    }
  }, [docs.length, dateSearch.length]);

  function handleChange(e) {
    const { name, value } = e.target;
    setDate((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function handleTagChange(e) {
    const { value } = e.target;
    setTag(value);
  }

  function handleTagSearch() {
    if (tag.length) {
      dispatch({
        type: "SET_TAG_SEARCH",
        tag
      });
    }
  }

  function handleDateSearch() {
    if (!isValidDate(date)) {
      setErrors("Please enter a valid date.");
      setDate({ day: 0, month: 0, year: 0 });
    } else {
      setErrors("");
      const { day, month, year } = date;
      dispatch({
        type: "SET_DATE_SEARCH",
        date: [day, month, year]
      });
    }
  }

  copied && setTimeout(() => setCopied(""), 3000);

  return (
    <>
      <div className="search-background">
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          {tagList.length > 0 && (
            <div
              style={{
                textAlign: "center",
                marginBottom: "45px"
              }}
            >
              <h1 className="tags-heading">{tagList.length} Tags</h1>
              <p className="tags-message">
                Click on any tag to copy it to your clipboard!
              </p>
              {copied && <div className="copied-text">Copied!</div>}
              {tagList.map((tag, index) => (
                <motion.div layout className="heading-tags" key={index}>
                  <CopyToClipboard
                    onCopy={() => setCopied("Copied!")}
                    text={tag}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="heading-tag"
                    >
                      {tag}
                    </motion.div>
                  </CopyToClipboard>
                </motion.div>
              ))}
            </div>
          )}
          <div className="search-date-heading">Filter photos by tag:</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "50px"
            }}
          >
            <input
              type="text"
              name="tag"
              onChange={handleTagChange}
              value={tag}
              className="input"
            />
            <img
              onClick={handleTagSearch}
              src={Blue}
              className="search-logo"
              alt="search"
            />
            <button
              className="search-button-tag"
              onClick={() => {
                setTag("");
                dispatch({
                  type: "SET_TAG_SEARCH",
                  tag: ""
                });
              }}
            >
              Clear Filter
            </button>
          </div>
          <div className="search-date-heading">Search photos by date:</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "50px"
            }}
          >
            <input
              type="text"
              name="day"
              placeholder="Day"
              onChange={handleChange}
              value={date.day ? date.day : ""}
              className="input"
            />
            <input
              type="text"
              name="month"
              onChange={handleChange}
              placeholder="Month"
              value={date.month ? date.month : ""}
              className="input"
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              onChange={handleChange}
              value={date.year ? date.year : ""}
              className="input"
            />
            <img
              onClick={handleDateSearch}
              src={Search}
              className="search-logo"
              alt="search"
            />
            <button
              className="search-button"
              onClick={() => {
                setDate({ day: 0, month: 0, year: 0 });
                dispatch({
                  type: "SET_DATE_SEARCH",
                  date: []
                });
                setErrors("");
              }}
            >
              Clear Filter
            </button>
            {errors && (
              <div style={{ color: "#ff4a4a", marginLeft: "10px" }}>
                {errors}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "50px auto" }}>
        {message && (
          <div className="no-photos">
            {message}
            <img
              src={Sad}
              alt="sad"
              style={{ width: "25px", margin: "10px" }}
            />
          </div>
        )}

        <ImageList
          docs={docs}
          flipped={flipped}
          setFlipped={setFlipped}
          deleteTag={deleteTag}
        />
      </div>
      {scrollPosition > 20 && <ScrollButton delayInMs="16.66" />}
    </>
  );
};

export default ImageGrid;
