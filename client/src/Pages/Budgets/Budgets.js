import React, {useState} from 'react';
import { Button, Form, Col, Row } from "react-bootstrap";

const onSubmit = (e) => {
    e.preventDefault();

  };

const Budgets = () => {
    const [text, setText] = useState('');

    return (
        <div className="budgets">
            <h3 className="mb-4">Budgets</h3>
            <Form className="form-type-categories" onSubmit={onSubmit}>
                 <Row>
                    <Col>
                         <Form.Control 
                            className="mb-2" 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            placeholder="Month"
                            required />
                    </Col>
                    <Col>
                         <Form.Control 
                            className="mb-2" 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            placeholder="Year"
                            required />
                    </Col>
                    <Col>
                         <Form.Control 
                            className="mb-2" 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            placeholder="Value in Euros"
                            required />
                    </Col>
                    <Col xs="auto">
                        <Button className="add earn btn-categories" type="submit">Add Budgets</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Budgets;