import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Col, Row } from "react-bootstrap";
import CardModule from '../../Components/CardModule/CardModule';
import ChartBar from '../../Components/Charts/Bar';

import { GlobalContext } from "../../context/GlobalState";

import './Budgets.css';

const Budgets = () => {
    const [ month, setMonth ] = useState('');
    const [ year, setYear ] = useState('');
    const [ value, setValue ] = useState('');
    const { budgets, getBudgets } = useContext(GlobalContext);
    const { addBudget, deleteBudgets } = useContext(GlobalContext);
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    const chart = () => {
        
        const chartValue = budgets.map((budget) => {
            return {label: monthNames[budget.month - 1], y: budget.value}
        })
        return [chartValue];
      };

    const onSubmit = (e) => {
        e.preventDefault();
        
        const newBudget = {
          id: Math.floor(Math.random() * 100000000),
          month: month,
          year: year,
          value: value
        };
        addBudget(newBudget);
      };

    useEffect(() => {  
        getBudgets()
      }, []);

    return (
        <div className="budgets">
            <h3 className="mb-4">Budgets</h3>
            <Form className="mb-5 form-type-categories" onSubmit={onSubmit}>
                 <Row>
                    <Col>
                        <Form.Group controlId="exampleForm.SelectCustomSizeLg1">
                            <Form.Control
                                as="select"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                custom
                            >
                                <option>Select Type Category</option>
                                <option value={1}>January</option>
                                <option value={2}>February</option>
                                <option value={3}>March</option>
                                <option value={4}>April</option>
                                <option value={5}>May</option>
                                <option value={6}>June</option>
                                <option value={7}>July</option>
                                <option value={8}>August</option>
                                <option value={9}>September</option>
                                <option value={10}>October</option>
                                <option value={11}>November</option>
                                <option value={12}>December</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="exampleForm.SelectCustomSizeLg2">
                            <Form.Control
                                as="select"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                custom
                            >
                                <option>Select Type Category</option>
                                <option value={2020}>2020</option>
                                <option value={2021}>2021</option>
                                <option value={2022}>2022</option>
                                <option value={2023}>2023</option>
                                <option value={2024}>2024</option>
                                <option value={2025}>2025</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                         <Form.Control 
                            className="mb-2" 
                            value={value} 
                            onChange={(e) => setValue(e.target.value)} 
                            placeholder="Value in Euros"
                            required />
                    </Col>
                    <Col xs="auto">
                        <Button className="add earn btn-categories" type="submit">Add Budgets</Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col xs={3}>
                    <ul className="list">
                        {budgets.map((budget) => (
                            <li className="mb-3" key={budget._id}>
                                <Button 
                                    key={budget.id} 
                                    className="table-delete-btn" 
                                    variant="danger" 
                                    onClick={() => deleteBudgets(budget._id)}
                                >
                                <i className="fa fa-trash-o" aria-hidden="true"></i>  
                                </Button>
                                <span className="ml-3">{monthNames[budget.month - 1]} {budget.year}: <b>{budget.value}€</b></span>
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col xs={9}>
                    <CardModule title="Earnings">
                        <ChartBar chart={chart()}/>
                    </CardModule>
                </Col>
            </Row>
        </div>
    );
}

export default Budgets;