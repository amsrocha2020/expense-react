import React from "react";
import { Form, Col, Card, Button } from "react-bootstrap";

import "./User.css";

const User = (props) => {
  return (
    <Card body>
      <div className="text-center">
        <div className="m-b">
          <img src="./foto_rocha.jpeg" style={{ width: 100 }} className="img-fluid rounded-circle mb-2" alt="profile" />
        </div>
        <div>
          <h2 className="h4">Miguel Rocha</h2>
          <hr />
          <Form className="user-form">
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Card>
  );
};

export default User;
