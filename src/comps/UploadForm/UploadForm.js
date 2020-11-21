import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useStateValue } from "../../providers/StateProvider";
import "./UploadForm.css";

const UploadForm = ({ setDate, setTag }) => {
  const [, dispatch] = useStateValue();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const types = ["image/png", "image/jpeg"];

  function handleChange(e) {
    dispatch({
      type: "SET_DATE_SEARCH",
      date: []
    });
    dispatch({
      type: "SET_TAG_SEARCH",
      tag: ""
    });
    setDate({ day: 0, month: 0, year: 0 });
    setTag("");
    const selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      if (selected) {
        setFile(null);
        setError("Please select a valid file type (png/jpeg).");
      }
    }
  }

  return (
    <form>
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div className="">{file.name}</div>}
        {file && (
          <div className="progress">
            <ProgressBar file={file} setFile={setFile} />
          </div>
        )}
      </div>
    </form>
  );
};

export default UploadForm;
