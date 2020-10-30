import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router-dom";
import Photo from "../images/photography.jpg";
import Search from "../images/search.png";
import UploadForm from "./UploadForm";
import ImageGrid from "./ImageGrid";
import Modal from "./Modal";
import Caption from "./Caption";
import Tag from "./Tag";
import Delete from "./DeleteBox";
import { logOut } from "../firebase/config";

const Dashboard = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  const [tag, setTag] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [date, setDate] = useState({ day: 0, month: 0, year: 0 });
  const [search, setSearch] = useState([]);
  const [current, setCurrent] = useState("");
  const [tagId, setTagId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [captionId, setCaptionId] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [history, user]);

  function LogOut() {
    logOut();
  }

  return (
    <>
      <div className="title">
        <div className="logout-div">
          <h1>Gallery</h1>
          <div className="logout-button" onClick={LogOut}>
            <img src={Search} alt="google icon" className="google-logo" />
            <span>LogOut</span>
          </div>
        </div>
        <img src={Photo} alt="photography" className="background-image" />
      </div>
      <UploadForm
        setTag={setTag}
        setSearchTag={setSearchTag}
        setDate={setDate}
        setSearch={setSearch}
      />
      <ImageGrid
        date={date}
        setDate={setDate}
        search={search}
        setSearch={setSearch}
        setCurrent={setCurrent}
        setSelected={setSelected}
        setCaptionId={setCaptionId}
        setId={setId}
        setTagId={setTagId}
        tag={tag}
        setTag={setTag}
        searchTag={searchTag}
        setSearchTag={setSearchTag}
      />
      {selected && <Modal selected={selected} setSelected={setSelected} />}
      {captionId && (
        <Caption
          current={current}
          captionId={captionId}
          setCaptionId={setCaptionId}
        />
      )}
      {id && <Delete id={id} setId={setId} />}
      {tagId && <Tag tagId={tagId} setTagId={setTagId} />}
    </>
  );
};

export default Dashboard;
