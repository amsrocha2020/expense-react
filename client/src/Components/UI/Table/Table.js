import React, { useContext, useEffect, useState } from "react"
import { Pagination,Button, Spinner } from 'react-bootstrap'

import moment from "moment"
import { Table } from "react-bootstrap"
import Modal from '../Modal/Modal'
import Form from '../Forms/Forms'

import "./Table.css"

import { GlobalContext } from "../../../context/GlobalState"

const TableContent = () => {
  const { transactions, getTransactions } = useContext(GlobalContext)
  const { categories, getCategories } = useContext(GlobalContext)
  const { loading, loadingFx } = useContext(GlobalContext)
  const { deleteTransaction } = useContext(GlobalContext)

  const [modalShow, setModalShow] = useState(false)
  const [transactionId, setTransactionId] = useState(1)

  console.log("[Table] loading >> ", loading)

  useEffect(() => {
      loadingFx()
      getTransactions()
      getCategories()
  }, [])

  return (
    <React.Fragment>
      <Modal show={modalShow} 
              onHide={() => setModalShow(false)}
              titlemodal="Edit Transaction">
              <Form transactionId={transactionId}/>
      </Modal>
      {false ? <div><Spinner className="mt-5" animation="border" /></div> : (
        <div>
        <Table striped bordered hover className="table mt-2 mb-5">
        <thead className="thead-dark">
          <tr>
            <th>Category</th>
            <th>Type Category</th>
            <th>Date</th>
            <th>State</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>
              { categories
                .filter(category => category._id === transaction.category_id) 
                .map(category => category.name)
                }</td>
              <td>{transaction.type_category}</td>
              <td>{moment(transaction.date).format("YYYY-MM-DD")}</td>
              <td>
                <span
                  className={
                    transaction.state === "Pay"
                      ? "badge badge-success"
                      : "badge badge-danger"
                  }
                >
                  {transaction.state}
                </span>
              </td>
              <td>€ {transaction.amount}</td>
              <td>
                <Button 
                  className="table-edit-btn mr-3" 
                  variant="success"
                  onClick={() => {
                    setTransactionId(transaction._id)
                    setModalShow(true)
                  }}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Button>
                  <Button 
                  className="table-delete-btn" 
                  variant="danger"
                  onClick={() => {
                    deleteTransaction(transaction._id)
                  }}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
         {/* <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />
        
          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>
        
          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination> */}
        </div>
      )}
    </React.Fragment>
  )
}

export default React.memo(TableContent);
