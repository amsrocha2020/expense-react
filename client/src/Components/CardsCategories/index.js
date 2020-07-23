import React, { useContext } from 'react';
import { Button, Card } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

import './CardsCategories.css';

const CardsCategories = ({nameCategory, categoryId}) => {
    const { typecategories, deleteTypeCategories } = useContext(GlobalContext);

    const types = typecategories.filter((typecategory) => typecategory.category_id === categoryId);

    return(
        <Card className="mr-3">
            <Card.Header>{nameCategory}</Card.Header>
            <Card.Body>
                <Card.Text>
                <ul className="list">
                    {types.map((typecategory) => (
                        <li className="mb-3" key={typecategory._id}>
                            <Button 
                                key={typecategory.id}
                                className="table-delete-btn" 
                                variant="danger"
                                onClick={() => deleteTypeCategories(typecategory._id)}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </Button>
                        <span className="ml-3">{typecategory.name}</span>
                    </li>
                    ))}
                </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardsCategories;