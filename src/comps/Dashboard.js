import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router-dom";
import Photo from "../images/photography.jpg";
import Search from "../images/search.png";
import UploadForm from "./UploadForm";
import ImageGrid from "./ImageGrid";
import Modal from "./Modal";
import Caption from "./Caption";
import Delete from "./DeleteBox";
import { logOut } from "../firebase/config";

const Dashboard = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  const [current, setCurrent] = useState("");
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
      <UploadForm />
      <ImageGrid
        setCurrent={setCurrent}
        setSelected={setSelected}
        setCaptionId={setCaptionId}
        setId={setId}
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
    </>
  );
};

export default Dashboard;
