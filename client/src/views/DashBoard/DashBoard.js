import React, { useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext/PostContext.js";
import { AuthContext } from "../../contexts/AuthContext/authContext.js";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import SinglePost from "../../components/Posts/SinglePost";
import AddPostModal from "../../components/Posts/AddPostModal.js";
import addIcon from "../../assets/plus-circle-fill.svg";
import UpdatePostModal from "../../components/Posts/UpdatePostModal.js";

const DashBoard = () => {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    postState: { posts, postLoading, postUpdate },
    getPosts,
    setShowAddPostModal,
    showToast,
    setShowToast,
  } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  let body = null;

  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <Card className="text-center mx-5 my-5">
        <Card.Header as="h1"> Hi, {username}</Card.Header>
        <Card.Body>
          <Card.Title>Welcome to Learnit</Card.Title>
          <Card.Text>
            Click the button bellow to track the first skill to learn
          </Card.Text>
          <Button variant="primary" onClick={() => setShowAddPostModal(true)}>
            LearnIt
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts?.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Create new post</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={() => setShowAddPostModal(true)}
          >
            <img src={addIcon} alt="add post" width="32" height="32" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }
  return (
    <div>
      {body}
      <AddPostModal />
      {postUpdate !== null && <UpdatePostModal />}

      <Toast
        show={showToast.show}
        style={{ position: "fixed", top: "10%", right: "10px", zIndex: "9999" }}
        className={`bg-${showToast.type} text-white`}
        onClose={() => {
          setShowToast({
            show: false,
            message: "",
            type: null,
          });
        }}
        delay={3000}
        autohide
      >
        <Toast.Body>{showToast.message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default DashBoard;
