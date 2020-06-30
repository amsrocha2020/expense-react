import React, { Fragment } from "react";
import { Form } from "react-bootstrap";

const User = (props) => {
  return (
    <Fragment>
      <h1>User</h1>
      <Form>
        <Form.Group>
          <Form.File id="exampleFormControlFile1" label="Example file input" />
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default User;
