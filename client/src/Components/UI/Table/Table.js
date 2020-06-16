import React, { useContext, useEffect } from "react";

import moment from "moment";
import { Table, Button } from 'react-bootstrap';

import { GlobalContext } from "../../../context/GlobalState";

const TableContent = () => {
    const { transactions, getTransactions, deleteTransaction } = useContext(GlobalContext);

    const deleteTrans = (id) => {
      console.log("Delete", id);
      deleteTransaction(id);
    }

    useEffect(() => {
      getTransactions();
      }, []);

  return (

    <Table striped bordered hover className="table mt-2 mb-5">
      <thead className="thead-dark">
        <tr>
          {/* <th>
            <input
              type="checkbox"
              aria-label="Checkbox for following text input"
            />
          </th> */}
          <th>Name</th>
          <th>Date</th>
          <th>State</th>
          <th>Value</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                {/* <td><input type="checkbox" aria-label="Checkbox for following text input" value={transaction._id} onChange={handleChange}/></td> */}
                <td>{transaction.type_category}</td>
                <td>{moment(transaction.date).format("YYYY-MM-DD")}</td>
                <td><span className={transaction.state === 'Pay' ? 'badge badge-success' : 'badge badge-danger'} >{transaction.state}</span></td>
                <td>€ {transaction.amount}</td>
                <td><Button className="mr-3">Edit</Button><Button variant="danger" onClick={()=>deleteTrans(transaction._id)}>Delete</Button></td>
              </tr>
            ))}
        </tbody>
      
    </Table>
  );
};

export default TableContent;
