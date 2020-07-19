import React, { useContext, useState } from "react";
import { Form, Col, Card, Button } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

import "./User.css";

const User = (props) => {
  let { user } = useContext(GlobalContext);

  return (
  <React.Fragment>
  {user ? (
    <Col xs={12} sm={12} lg={8}>
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
              <Col xs={12} sm={6}>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={user.firstName} placeholder="Enter your First Name" />
                  </Form.Group>
              </Col>
                
              <Col xs={12} sm={6}>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={user.lastName} placeholder="Enter your Last Name" />
                  </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs={12} sm={6}>
                <Form.Group  controlId="formGridAddress1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={user.email} placeholder="Enter your Last Name" />
                </Form.Group>
              </Col>
              
              <Col xs={12} sm={6}>
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Passwrod</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Col>
            </Form.Row>
            
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Card>
    </Col>)
    : 'Loading ....'}
    </React.Fragment>
  );
};

export default User;
