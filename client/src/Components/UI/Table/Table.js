import React, { useContext, useEffect, useState } from 'react'
import { Button, Spinner, Table } from 'react-bootstrap'

import moment from 'moment'
import Modal from '../Modal/Modal'
import Form from '../Forms/Forms'
import Pagination from '../../Pagination/Pagination'

import "./Table.css"

import { GlobalContext } from "../../../context/GlobalState"

const TableContent = ({ searchStartDate, searchEndDate, searchInput }) => {
  const { transactions, getTransactions } = useContext(GlobalContext)
  const { categories, getCategories } = useContext(GlobalContext)
  const { loadingFx } = useContext(GlobalContext)
  const { deleteTransaction } = useContext(GlobalContext)
  
  const [modalShow, setModalShow] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [contentPerPage] = useState(5)
  
  // Get current lines table - Pagination
  const indexOfLastRow = currentPage * contentPerPage
  const indexOfFirstRow = indexOfLastRow - contentPerPage
  
  // Search by date
  let filterByDate = transactions.filter(item => {
    let date = new Date(item.date);
    return date >= searchStartDate && date <= searchEndDate;
 })

  // Search
  let currentRowFilter = filterByDate.filter(transaction => transaction.type_category.toLowerCase().includes(searchInput));
  let currentRow = currentRowFilter.slice(indexOfFirstRow, indexOfLastRow)

  // setTransaction(prevTransactions => [...prevTransactions, currentRow])

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber)
  
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
              <Form />
      </Modal>
      {false ? <div><Spinner className="mt-5" animation="border" /></div> : (
        <div>
        <Table striped bordered hover className="table mt-2">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Type Category</th>
            <th scope="col">Date</th>
            <th scope="col">State</th>
            <th scope="col">Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentRow.map((transaction) => (
            <tr key={transaction._id}>
              <td data-label="Category">
              { categories
                .filter(category => category._id === transaction.category_id) 
                .map(category => category.name)
                }</td>
              <td data-label="Type Category">{transaction.type_category}</td>
              <td data-label="Date">{moment(transaction.date).format("YYYY-MM-DD")}</td>
              <td data-label="State">
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
              <td data-label="Value">€ {transaction.amount}</td>
              <td>
                <Button 
                  className="table-edit-btn mr-3" 
                  variant="success"
                  onClick={() => {
                    // setTransactionId(transaction._id)
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
      <Pagination contentPerPage={contentPerPage} totalRows={currentRowFilter.length} paginate={paginate}/>
        </div>
      )}
    </React.Fragment>
  )
}

export default React.memo(TableContent);
