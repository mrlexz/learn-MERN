import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { PostContext } from "../../contexts/PostContext/PostContext";

const ActionButton = ({ url, id }) => {
  const { getValueUpdate, deletePost } = useContext(PostContext);
  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="25" height="25" />
      </Button>
      <Button className="post-button" onClick={() => getValueUpdate(id)}>
        <img src={editIcon} alt="edit" width="25" height="25" />
      </Button>
      <Button className="post-button" onClick={() => deletePost(id)}>
        <img src={deleteIcon} alt="delete" width="25" height="25" />
      </Button>
    </>
  );
};

export default ActionButton;
