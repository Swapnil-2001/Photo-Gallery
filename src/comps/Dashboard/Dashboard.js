import React, { useEffect, useState } from "react";
import { useStateValue } from "../../providers/StateProvider";
import { useHistory } from "react-router-dom";
import Photo from "../../images/photography.jpg";
import Search from "../../images/search.png";
import UploadForm from "../UploadForm/UploadForm";
import ImageGrid from "../ImageGrid/ImageGrid";
import Modal from "../Modal";
import Caption from "../Caption";
import Tag from "../Tag";
import Delete from "../DeleteBox";
import { logOut } from "../../firebase/config";
import "./Dashboard.css";

const Dashboard = () => {
  const [
    { tagId, selectedImage, user, captionId, deleteId },
    dispatch
  ] = useStateValue();
  const history = useHistory();

  const [tag, setTag] = useState("");
  const [date, setDate] = useState({ day: 0, month: 0, year: 0 });

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [history, user]);

  const handleLogOut = () => {
    logOut();
    dispatch({
      type: "SET_USER",
      user: null
    });
  };

  return (
    <>
      <div className="dashboard-background">
        <div className="title">
          <div className="logout-div">
            <h1>Gallery</h1>
            <div className="logout-button" onClick={handleLogOut}>
              <img src={Search} alt="google icon" className="google-logo" />
              <span>LogOut</span>
            </div>
          </div>
          <img src={Photo} alt="photography" className="background-image" />
          <p style={{ color: "#64958f", fontWeight: "600" }}>
            Click to upload a photo
          </p>
        </div>
        <UploadForm setTag={setTag} setDate={setDate} />
      </div>
      <ImageGrid date={date} setDate={setDate} tag={tag} setTag={setTag} />
      {/*    modals    */}
      {selectedImage && <Modal />}
      {captionId && <Caption />}
      {deleteId && <Delete />}
      {tagId && <Tag />}
    </>
  );
};

export default Dashboard;
