import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { GlobalContext } from "../../../context/GlobalState";

const Forms = ({ transactionId }) => {
  const { transactionUpdate, updateTransaction, addTransactions, getTransactionsById } = useContext(GlobalContext);
  const { typecategories, getTypeCategories } = useContext(GlobalContext);
  const { categories,getCategories } = useContext(GlobalContext);
  const { modalTrans } = useContext(GlobalContext);

  const [startDate, setStartDate] = useState(new Date());
  const [selectState, setSelectState] = useState("");
  const [typeCat, setTypeCat] = useState("");
  const [amount, setAmount] = useState("");
  const [catId, setCat] = useState("");

  let [ types, setTypes ] = useState(typecategories);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      category_id: catId,
      type_category: typeCat,
      date: startDate,
      state: selectState,
      amount: amount,
    };
    
    ( transactionId ) ? updateTransaction(transactionUpdate[0]._id,newTransaction) : addTransactions(newTransaction);   
  };

  useEffect(() => {
      if (transactionUpdate.length > 0) {
          setCat(transactionUpdate[0].category_id); 
          setTypeCat(transactionUpdate[0].type_category);
          setSelectState(transactionUpdate[0].state);
          setStartDate(new Date(transactionUpdate[0].date));
          setAmount(transactionUpdate[0].amount);
      }
  },[transactionUpdate]);

  const handleChange = (e) => {
    setCat(e.target.value)
    
    types = typecategories.filter((typecategory) => typecategory.category_id === e.target.value)
    
    setTypes(types);
  }

  useEffect(() => { 
    if( transactionId ) getTransactionsById(transactionId);
    
      getCategories()
      getTypeCategories()  
  }, []);

  return (
    <Form
      className="form-transactions"
      name="form-transactions"
      onSubmit={onSubmit}
    >
      <Row>
        <Col className="categories">
          <Form.Group controlId="exampleForm.SelectCustomSizeLg">
            <Form.Label>Categories</Form.Label>
            <Form.Control
              as="select"
              value={catId}
              onChange={handleChange}
              custom
            >
              <option>Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="exampleForm.SelectCustomSizeLg">
            <Form.Label>Type Categories</Form.Label>
            <Form.Control
              as="select"
              value={typeCat}
              onChange={(e) => setTypeCat(e.target.value)}
              custom
            >
              <option>Select Type Category</option>
              {types.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <label htmlFor="data-categorie">Date</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
          />
        </Col>
        <Col className="states">
          <Form.Group controlId="exampleForm.SelectCustomSizeLg2">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              value={selectState}
              onChange={(e) => setSelectState(e.target.value)}
              custom
            >
              <option>Select State</option>
              <option value="Pay">Pay</option>
              <option value="Unpaid">Unpaid</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <label htmlFor="value-categorie">Value in Euros</label>
          <input
            type="text"
            className="value-categorie"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </Col>
      </Row>
      <div className="text-right">
        <Button
          className="mr-3"
          onClick={() => modalTrans(false)}
          variant="secondary"
        >
          Close
        </Button>
        <Button
          type="submit"
          variant="success"
          onClick={() => modalTrans(false)}
        >
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default React.memo(Forms);
