import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButton from "./ActionButton";
import { POST_PROCESS } from "../../constants";

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  return (
    <Card
      className="shadow"
      border={
        status === POST_PROCESS.TO_LEARN
          ? "success"
          : status === POST_PROCESS.LEARNING
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col sm={8}>
              <p className="post-title">{title}</p>
              <Badge
                pill
                variant={
                  status === POST_PROCESS.TO_LEARN
                    ? "success"
                    : status === POST_PROCESS.LEARNING
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col sm={4} className="text-right">
              <ActionButton url={url} id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text className="post-title">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
