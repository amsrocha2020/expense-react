import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { GlobalContext } from "../../../context/GlobalState";

const forms = (props) => {
  const { categories, getCategories, typecategories, getTypeCategories, addTransactions } = useContext(GlobalContext);

  const [startDate, setStartDate] = useState(new Date());
  const [catId, setCat] = useState("");
  const [typeCat, setTypeCat] = useState("");
  const [selectState, setSelectState] = useState("");
  const [amount, setAmount] = useState("");
  const [loading] = useState(false);

  const onSubmit = (e) => {

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      category_id: catId,
      type_category: typeCat,
      date: startDate,
      state: selectState,
      amount: amount,
    };

    // console.log("Form -> ", newTransaction);
    addTransactions(newTransaction);
  };

  useEffect(() => {
    getCategories();
    getTypeCategories();
  }, []);

  return (
      <form className="form-transactions" onSubmit={onSubmit}>
        <div className="row">
          <div className="col categories">
            <Form.Group controlId="exampleForm.SelectCustomSizeLg">
              <Form.Label>Categories</Form.Label>
              <Form.Control 
              as="select" 
              size="lg" 
              value={catId}
              onChange={(e) => setCat(e.target.value)}
              custom>
                <option>Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {" "}
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
                size="lg" 
                value={typeCat}
                onChange={(e) => setTypeCat(e.target.value)}
                disabled={loading}
              custom>
                <option>Select Type Category</option>
                {typecategories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {" "}
                    {category.name}
                  </option>
                ))}
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
                size="lg"
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
        
        <div className="row">
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
          <button>Save</button>
      </form>
  );
};

export default forms;
