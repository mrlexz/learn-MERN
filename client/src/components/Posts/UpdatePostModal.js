import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { PostContext } from "../../contexts/PostContext/PostContext";
import { POST_PROCESS, ARR_POST_PROCESS } from "../../constants";

const UpdatePostModal = () => {
  const {
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
    postState: { postUpdate },
  } = useContext(PostContext);

  const defaultValue = {
    title: "",
    description: "",
    url: "",
    status: "TO_LEARN",
  };

  const [postForm, setPostForm] = useState(postUpdate);

  const { title, description, url, status } = postForm;

  useEffect(() => {
    setPostForm(postUpdate);
  }, [postUpdate]);

  const onChangePostForm = (event) => {
    setPostForm({
      ...postForm,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost({
      ...postForm,
      id: postUpdate._id,
    });
    if (success) {
      setShowToast({
        show: true,
        message: message,
        type: "success",
      });
      onHide();
    } else {
      setShowToast({
        show: true,
        message: message,
        type: "danger",
      });
    }
  };
  const onHide = () => {
    setShowUpdatePostModal(false);
    setPostForm(postUpdate);
  };

  return (
    <Modal show={showUpdatePostModal}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Update </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangePostForm}
            ></Form.Control>
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangePostForm}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube tutorial url"
              name="url"
              value={url}
              onChange={onChangePostForm}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={onChangePostForm}
            >
              {ARR_POST_PROCESS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
