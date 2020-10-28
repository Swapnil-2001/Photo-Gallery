import React, { useState, useEffect } from "react";
import Sad from "../images/sweat.png";
import Search from "../images/loupe.png";
import Delete from "../images/x-button.png";
import Caption from "../images/post-it.png";
import Picture from "../images/picture.png";
import Edit from "../images/pencil.png";
import ReactCardFlip from "react-card-flip";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";

const ImageGrid = ({ setCurrent, setSelected, setCaptionId, setId }) => {
  const [date, setDate] = useState({ day: 0, month: 0, year: 0 });
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState([]);
  const [errors, setErrors] = useState("");
  const [flipped, setFlipped] = useState([]);
  const id = localStorage.getItem("user_id");
  let { docs } = useFirestore(id);
  if (search.length > 0) {
    docs = docs.filter((doc) => {
      const [day, month, year] = search;
      const d = doc.createdAt.toDate();
      return (
        (d.getDate() === parseInt(day, 10) || d.getDate() === day) &&
        d.getMonth() === month - 1 &&
        (d.getFullYear() === year || d.getFullYear() === parseInt(year, 10))
      );
    });
  }

  useEffect(() => {
    if (docs.length > 0) {
      const arr = new Array(docs.length).fill(false);
      setFlipped(arr);
      setMessage(null);
    } else {
      if (search.length > 0) {
        setMessage("No photos on that day!");
      }
    }
  }, [docs.length, search.length]);

  function isValidDate(givenDate) {
    const { day, month, year } = givenDate;
    let dateString =
      year.toString() +
      "-" +
      ("0" + month.toString()).slice(-2) +
      "-" +
      ("0" + day.toString()).slice(-2);
    let regEx = /^(?:(?:(?:(?:(?:[13579][26]|[2468][048])00)|(?:[0-9]{2}(?:(?:[13579][26])|(?:[2468][048]|0[48]))))-(?:(?:(?:09|04|06|11)-(?:0[1-9]|1[0-9]|2[0-9]|30))|(?:(?:01|03|05|07|08|10|12)-(?:0[1-9]|1[0-9]|2[0-9]|3[01]))|(?:02-(?:0[1-9]|1[0-9]|2[0-9]))))|(?:[0-9]{4}-(?:(?:(?:09|04|06|11)-(?:0[1-9]|1[0-9]|2[0-9]|30))|(?:(?:01|03|05|07|08|10|12)-(?:0[1-9]|1[0-9]|2[0-9]|3[01]))|(?:02-(?:[01][0-9]|2[0-8])))))$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    let d = new Date(year, month - 1, day);
    let dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return (
      (d.getDate() === parseInt(day, 10) || d.getDate() === day) &&
      d.getMonth() === month - 1 &&
      (d.getFullYear() === year || d.getFullYear() === parseInt(year, 10))
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setDate((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function handleSearch() {
    if (!isValidDate(date)) {
      setErrors("Please enter a valid date.");
      setDate({ day: 0, month: 0, year: 0 });
    } else {
      setErrors("");
      const { day, month, year } = date;
      setSearch([day, month, year]);
    }
  }

  return (
    <>
      <div className="search-date-heading">Search saved photos by date:</div>
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
          onClick={handleSearch}
          src={Search}
          className="search-logo"
          alt="search"
        />
        <button
          className="search-button"
          onClick={() => {
            setDate({ day: 0, month: 0, year: 0 });
            setSearch([]);
            setErrors("");
          }}
        >
          All photos
        </button>
        {errors && (
          <div style={{ color: "#ff4a4a", marginLeft: "10px" }}>{errors}</div>
        )}
      </div>

      {message && (
        <div className="no-photos">
          {message}
          <img src={Sad} alt="sad" style={{ width: "25px", margin: "10px" }} />
        </div>
      )}
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
    </>
  );
};

export default ImageGrid;
