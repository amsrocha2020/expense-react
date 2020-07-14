import React, { useContext, useState, useEffect } from "react";
import { FormControl, InputGroup, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

import moment from "moment";

import Cards from "../../Components/Cards/Cards";
import Modal from "../../Components/UI/Modal/Modal";
import Forms from "../../Components/UI/Forms/Forms";
import Table from "../../Components/UI/Table/Table";
import Doughnut from "../../Components/Charts/Doughnut";
import Crosshair from "../../Components/Charts/Crosshair";
import { utils, utilsFilterBudget } from '../../Utils/Utils';

import { GlobalContext } from "../../context/GlobalState";

import "./Dashboard.css";

const Dashboard = (props) => {
  const { budgets, getBudgets } = useContext(GlobalContext);
  const { transactions, getTransactions } = useContext(GlobalContext);
  const { modalTransaction, modalTrans } = useContext(GlobalContext);

  const [ startDate, setStartDate ] = useState(
    new Date().setDate(new Date().getDate() - 30)
  );
  const [ endDate, setEndDate ] = useState(new Date());
  const [ search, setSearch ] = React.useState("");

  let filterDate = utils(startDate, endDate, transactions);
  let valueAnual = utilsFilterBudget(startDate, endDate, budgets);
  
  const amounts = filterDate.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  const balancoAnual = () => {
    let totalAnual = valueAnual + total;
    let percGanhos = (valueAnual / totalAnual) * 100;
    let percDespesas = (total / totalAnual) * 100;

    return [
      { name: "Earnings", y: percGanhos },
      { name: "Expenses", y: percDespesas },
    ];
  };

  const onChangeSearch = (e) => {
    let val = e.target.value;

    setSearch(val.toLowerCase());
  };

  const expensesM = () => {

    const trans = filterDate.map((transaction) => {
      return {
        x: new Date(moment(transaction.date).format("YYYY-MM-DD")),
        y: transaction.amount,
      };
    });

    useEffect(() => {
      getBudgets();
      getTransactions();
    }, []);

    return trans;
  };

  return (
    <div className="dashboard">
      <h3 className="mb-4">Dashboard</h3>
      <div className="card-columns align-center mb-3">
        <Cards cardClass="earn" cardDescription="Balance" cardDescriptionsub="Earnings" money={valueAnual} />
        <Cards cardClass="costs" cardDescription="Expenses" cardDescriptionsub="Spending" money={total} />
        <Cards cardClass="savings" cardDescription="Savings" cardDescriptionsub="Save" money={1000 - total}/>
      </div>

      <div className="transactions">
        <Row>
          <Col className="mb-3" xs={12} sm={2}>
            <Button  variant="success" onClick={() => modalTrans(true)}>
              Add Transaction
            </Button>
          </Col>

          <Col className="mb-3" xs={6} sm={2}>
            <InputGroup className="input-date mr-4">
              <InputGroup.Prepend>
                <InputGroup.Text id="search-date-start">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                </InputGroup.Text>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
              </InputGroup.Prepend>
            </InputGroup>
          </Col>

          <Col className="mb-3" xs={6} sm={2}>
            <InputGroup className="input-date mr-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="search-date-end">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                </InputGroup.Text>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="mr-2"
                />
              </InputGroup.Prepend>
            </InputGroup>
          </Col>

          <Col xs={12} sm={6}>
            <InputGroup className="mb-3 input-search" value={search} onChange={onChangeSearch}>
              <InputGroup.Prepend>
                <InputGroup.Text id="search-input">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </InputGroup.Text>
              <FormControl placeholder="Search" aria-label="search" aria-describedby="basic-addon1" />
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
        </Row>
        <Table
          searchStartDate={startDate}
          searchEndDate={endDate}
          searchInput={search}
        />
        <div>
          <Row>
            <Col className="mb-5" xs={12} sm={6}>
              <Doughnut balAnual={balancoAnual()} />
            </Col>

            <Col xs={12} sm={6}>
              <Crosshair expensesMonth={expensesM()} />
            </Col>
          </Row>
        </div>
        
        <Modal
          show={modalTransaction}
          onHide={() => modalTrans(false)}
          titlemodal="Add Transaction"
        >
          <Forms />
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
