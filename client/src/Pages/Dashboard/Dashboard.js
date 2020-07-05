import React, { useContext, useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import moment from "moment";

import Cards from "../../Components/Cards/Cards";
import Modal from "../../Components/UI/Modal/Modal";
import Forms from "../../Components/UI/Forms/Forms";
import Table from "../../Components/UI/Table/Table";
import Doughnut from "../../Components/Charts/Doughnut";
import Crosshair from "../../Components/Charts/Crosshair";

import { GlobalContext } from "../../context/GlobalState";

import "./Dashboard.css";

const Dashboard = (props) => {
  const { transactions, categories } = useContext(GlobalContext);
  const { modalTransaction, modalTrans } = useContext(GlobalContext);

  const [startDate, setStartDate] = useState(new Date("2020/02/08"));
  const [endDate, setEndDate] = useState(new Date("2020/02/10"));

  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  const balancoAnual = () => {
    let totalAnual = 1200 + total;
    let percGanhos = (1200 / totalAnual) * 100;
    let percDespesas = (total / totalAnual) * 100;

    return [
      { name: "Earnings", y: percGanhos },
      { name: "Expenses", y: percDespesas },
    ];
  };

  const expensesM = () => {
    const trans = transactions.map((transaction) => {
      return {
        x: new Date(moment(transaction.date).format("YYYY-MM-DD")),
        y: transaction.amount,
      };
    });

    return trans
  };

  return (
    <div className="dashboard">
      <h3 className="mb-4">Dasboard</h3>
      <div className="card-columns align-center mb-3">
        <Cards
          cardClass="earn"
          cardDescription="Balance"
          cardDescriptionsub="Earnings"
          money="1200 "
        />
        <Cards
          cardClass="costs"
          cardDescription="Expenses"
          cardDescriptionsub="Spending"
          money={total}
        />
        <Cards
          cardClass="savings"
          cardDescription="Savings"
          cardDescriptionsub="Save"
          money={1200 - total}
        />
      </div>
      <div className="transactions">
        <div class="row">
          <div className="col-2">
            <Button
              className="mr-3"
              variant="success"
              onClick={() => modalTrans(true)}
            >
              Add Transaction
            </Button>
          </div>
          <div class="col">
            <div className="rage-dates">
              <div className="row">
                <div className="mr-4">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
                <div className="mr-3">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="mr-2"
                  />
                </div>
                  <InputGroup className="mb-3 input-search">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <i class="fa fa-search" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Search"
                      aria-label="search"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
              </div>
            </div>
          </div>
        </div>
        <Table />
        <div>
          <div className="row">
            <div className="col-6">
              <Doughnut balAnual={balancoAnual()} />
            </div>
            <div className="col-6">
              <Crosshair expensesMonth={expensesM()} />
            </div>
          </div>
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
