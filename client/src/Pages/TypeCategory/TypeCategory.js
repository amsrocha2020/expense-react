import React, { useState, useContext, useEffect } from "react";
import { CardGroup, Button, Form, Col, Row } from "react-bootstrap";
import CardsCategories from '../../Components/CardsCategories/CardsCategories';

import { GlobalContext } from "../../context/GlobalState";

const TypeCategory = () => {

  const [text, setText] = useState('');
  const [catId, setCat] = useState('');
  const { categories, getCategories } = useContext(GlobalContext);
  const { getTypeCategories, addTypeCategory } = useContext(GlobalContext);
  
  const onSubmit = (e) => {
    e.preventDefault();

    const newTypeCategory = {
      id: Math.floor(Math.random() * 100000000),
      category_id: catId,
      name: text,
    };
    addTypeCategory(newTypeCategory);
  };

  const handleChange = (e) => {
    setCat(e.target.value)
  }

  useEffect(() => {  
    getCategories()
    getTypeCategories()
  }, []);

  return (
    <div className="typeCategories">
      <h3 className="mb-4">Type of Categories</h3>
      <Form className="form-type-categories" onSubmit={onSubmit}>
        <Row>
          <Col>
            <Form.Control className="mb-2" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type Categories"
            required />
            </Col>
            <Col>
              <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                <Form.Control as="select" value={catId} onChange={handleChange} required custom>
                  <option>Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Button className="add earn btn-categories" type="submit">Add Type Category</Button>
            </Col>
        </Row>
      </Form>
      {/* <CardGroup> */}
          {categories.map((category) => (
              <CardsCategories nameCategory={category.name} categoryId={category._id} />
          ))}
      {/* </CardGroup> */}
    </div>
  );
};

export default TypeCategory;