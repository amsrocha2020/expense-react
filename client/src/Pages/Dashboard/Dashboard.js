import React, { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";

import Cards from "../../Components/Cards/Cards";
import Modal from "../../Components/UI/Modal/Modal";
import Forms from "../../Components/UI/Forms/Forms";
import Table from "../../Components/UI/Table/Table";
import Doughnut from "../../Components/Charts/Doughnut";

import { GlobalContext } from "../../context/GlobalState";

import "./Dashboard.scss";

const Dashboard = (props) => {
  const { transactions } = useContext(GlobalContext);
  const { modalTransaction, modalTrans } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  const balancoAnual = () => {
    
    let totalAnual = 1200 + total;
    let percGanhos = (1200 / totalAnual) * 100;
    let percDespesas = (total / totalAnual) * 100;

    return (
      [ { name: "Earnings", y: percGanhos }, { name: "Expenses", y: percDespesas }]
    )
  }
  
  return (
    <div className="dashboard">
      <h3 className="mb-4">Dasboard</h3>
      <div className="card-columns align-center mb-5">
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
        <Button className="mr-3" variant="success" onClick={() => modalTrans(true)}>
          Add Transaction
        </Button>
        <Table/>
        <Doughnut balAnual={balancoAnual()}/>
        {/* <Doughnut expenses={expensesCat()}/> */}
        <Modal 
            show={modalTransaction} 
            onHide={() => modalTrans(false)}
            titlemodal="Add Transaction">
            <Forms />
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
