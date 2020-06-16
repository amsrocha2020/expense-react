import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import Cards from "../../Components/Cards/Cards";
import Modal from "../../Components/UI/Modal/Modal";
import Forms from "../../Components/UI/Forms/Forms";
import Table from "../../Components/UI/Table/Table";
import Doughnut from "../../Components/Charts/Doughnut";

import { GlobalContext } from "../../context/GlobalState";

import "./Dashboard.scss";

const dashboard = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  const { transactions } = useContext(GlobalContext);

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

  const deleteTransactionById = () => {
    // let arrayId = [];
    console.log("Dasboard -> ", "Sim");

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
        <Button className="mr-3" variant="success" onClick={() => setModalShow(true)}>
          Add Transaction
        </Button>
        <Button variant="danger" onClick={()=>{deleteTransactionById()}}>
          Delete Transaction
        </Button>
        <Table/>
        <Doughnut balAnual={balancoAnual()}/>
        <Modal 
            show={modalShow} 
            onHide={() => setModalShow(false)}
            titlemodal="Add Transaction">
          <Forms />
        </Modal>
      </div>
    </div>
  );
};

export default dashboard;
