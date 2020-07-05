import React, { useContext, useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

import { GlobalContext } from "../../../context/GlobalState";

const Forms = ({ transactionId }) => {
  const {
    categories,
    getCategories,
    typecategories,
    getTypeCategories,
    addTransactions,
    getTransactionsById
  } = useContext(GlobalContext);
  const { modalTrans } = useContext(GlobalContext);

  let type = [];

  const [startDate, setStartDate] = useState(new Date());
  const [catId, setCat] = useState("");
  const [typeCat, setTypeCat] = useState("");
  const [selectState, setSelectState] = useState("");
  const [amount, setAmount] = useState("");
  const [loading] = useState(false);

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

    addTransactions(newTransaction);
  };

  useEffect(() => {
    console.log("[Forms] transactionId >> ", transactionId)
     if(transactionId){
      getTransactionsById(transactionId)
     } else {
      getCategories()
      getTypeCategories()
     }
    
  }, []);

  const handleChange = (e) => {
    setCat(e.target.value)
    
   const types = typecategories
    .filter((typecategory) => typecategory.category_id === e.target.value)
    .map(typecategory => 
        typecategory._id
       )
    
       console.log("[Forms] >>", types)
  }
      
      

  return (
    <form
      className="form-transactions"
      name="form-transactions"
      onSubmit={onSubmit}
    >
      <div className="row">
        <div className="col categories">
          <Form.Group controlId="exampleForm.SelectCustomSizeLg">
            <Form.Label>Categories</Form.Label>
            <Form.Control
              as="select"
              value={catId}
              onChange={handleChange }
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
        </div>
        <div className="col">
          <Form.Group controlId="exampleForm.SelectCustomSizeLg">
            <Form.Label>Type Categories</Form.Label>
            <Form.Control
              as="select"
              value={typeCat}
              onChange={(e) => setTypeCat(e.target.value)}
              disabled={loading}
              custom
            >
              <option>Select Type Category</option>
              {typecategories.map((category) => (
                <option key={category._id} value={category.name}>
                  {" "}
                  {category.name}
                </option>
              ))}
              {/* {type.map((value) => value.name )} */}
            </Form.Control>
          </Form.Group>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label htmlFor="data-categorie">Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col states">
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
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="value-categorie">Value in Euros</label>
          <input
            type="text"
            className="value-categorie"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
      </div>
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
    </form>
  );
};

export default Forms;
