import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Col, Row } from "react-bootstrap";

import CardModule from '../../Components/CardModule';
import ChartBar from '../../Components/Charts/Bar';

import { GlobalContext } from "../../context/GlobalState";

import './Budgets.css';

const Budgets = () => {
    // Current Year
    const date = new Date();
    const currentYear = date.getFullYear();
    
    const { addBudget, deleteBudgets } = useContext(GlobalContext);
    const { budgets, getBudgets } = useContext(GlobalContext);

    const [yearBudget, setYearBudget] = useState(currentYear);
    const [budgetsYear, setBudgetsYear] = useState(budgets);
    const [month, setMonth] = useState('');
    const [value, setValue] = useState('');
    const [year, setYear] = useState('');
    
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    const chart = () => {
       
        // let sumPerMonthYear = budgetsYear.reduce(function(accumulator, cur) {
        //     let val =  cur.month + '-' + cur.year , 
        //             found = accumulator.find(function(elem) {
        //                 console.log("inside > ", cur.month + '-' + cur.year)
        //             return elem.month + '-' + elem.year === val 
        //         });
        //     if (found) found.value += cur.value;
        //     else accumulator.push(cur);
        //     return accumulator;
        //   }, []);
          
        // console.log("sumPerMonthYear > ", sumPerMonthYear)

        const chartValue = budgetsYear.map((budget) => {
            return { label: monthNames[budget.month - 1], 
                     y: budget.value
            }
        })
        return [chartValue];
    };

    const handlerChangeBudgetYear = (e) => {
        setYearBudget(e.target.value)
        
        const budgetYear =  budgets.filter(budget => budget.year === Number(e.target.value))
        setBudgetsYear(budgetYear)
    }

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
                                <option>Select Month</option>
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
                                <option>Select Year</option>
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
                    <Form>
                    <Form.Group controlId="exampleForm.SelectCustomSizeLg2">
                            <Form.Control
                                as="select"
                                value={yearBudget}
                                onChange={(e) => handlerChangeBudgetYear(e)}
                                custom
                            >
                                <option>Select Year</option>
                                <option value={2020}>2020</option>
                                <option value={2021}>2021</option>
                                <option value={2022}>2022</option>
                                <option value={2023}>2023</option>
                                <option value={2024}>2024</option>
                                <option value={2025}>2025</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    <ul className="list">
                        {budgetsYear.map((budget) => (
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