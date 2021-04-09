import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { PostContext } from "../../contexts/PostContext/PostContext";

const AddPostModal = () => {
  const {
    showAddPostModal,
    setShowAddPostModal,
    addNewPost,
    setShowToast,
  } = useContext(PostContext);
  const defaultValue = {
    title: "",
    description: "",
    url: "",
    status: "TO_LEARN",
  };
  const [postForm, setPostForm] = useState(defaultValue);

  const { title, description, url } = postForm;

  const onChangePostForm = (event) => {
    setPostForm({
      ...postForm,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addNewPost(postForm);
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
    setShowAddPostModal(false);
    setPostForm(defaultValue);
  };

  return (
    <Modal show={showAddPostModal}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>What do you want to learn ?</Modal.Title>
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

export default AddPostModal;
