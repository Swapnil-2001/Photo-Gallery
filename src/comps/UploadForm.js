import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = ({ setSearch, setDate, setTag, setSearchTag }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const types = ["image/png", "image/jpeg"];

  function handleChange(e) {
    setSearch([]);
    setDate({ day: 0, month: 0, year: 0 });
    setTag("");
    setSearchTag("");
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
