import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

import './Category.css';

const Categories = () => {
  const [text, setText] = useState("");
  const { categories, getCategories } = useContext(GlobalContext);
  const { addCategory, deleteCategory } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      id: Math.floor(Math.random() * 100000000),
      name: text,
    };
    addCategory(newCategory);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="categories">
      <h3 className="mb-4">Categories</h3>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="category">
              <Form.Control type="text" placeholder="Categories" value={text} onChange={(e) => setText(e.target.value)} />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button type="submit" className="add earn btn-categories">Add Categories</Button>
          </Col>
        </Row>
      </Form>
      <ul className="list">
        {Object.keys(categories).length > 0
          ? categories.map((category) => (
              <li className="mb-3" key={category._id}>
                <Button key={category.id} className="table-delete-btn" variant="danger" 
                onClick={() => deleteCategory(category._id)}
                >
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </Button>
                {category.name.toLowerCase() === "home" ? (
                  <span className="ml-3">
                    <i className="fa fa-home" aria-hidden="true"></i>
                  </span>
                ) : (
                  ""
                )}
                {category.name.toLowerCase() === "car" ? (
                  <span className="ml-3">
                    <i className="fa fa-car" aria-hidden="true"></i>
                  </span>
                ) : (
                  ""
                )}
                {category.name.toLowerCase() === "bank" ? (
                  <span className="ml-3">
                    <i className="fa fa-university" aria-hidden="true"></i>
                  </span>
                ) : (
                  ""
                )}
                {category.name.toLowerCase() === "investiment" ? (
                  <span className="ml-3">
                    <i className="fa fa-money" aria-hidden="true"></i>
                  </span>
                ) : (
                  ""
                )}
                {category.name.toLowerCase() === "health" ? (
                  <span className="ml-3">
                    <i className="fa fa-medkit" aria-hidden="true"></i>
                  </span>
                ) : (
                  ""
                )}
                {category.name.toLowerCase() === "school" ? (
                  <span className="ml-3">
                    <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                  </span>
                ) : (
                  ""
                )}
                <span className="ml-3">{category.name}</span>
              </li>
            ))
          : "No categories add!"}
      </ul>
    </div>
  );
};

export default Categories;
