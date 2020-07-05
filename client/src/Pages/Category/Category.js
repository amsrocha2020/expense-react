import React, { useContext, useEffect, useState } from "react"
import axios from 'axios'

import { Button } from "react-bootstrap"

import { GlobalContext } from "../../context/GlobalState"

const Categories = () => {
  const [ text, setText ] = useState('')
  const { categories, getCategories } = useContext(GlobalContext)
  const { addCategory, deleteCategory } = useContext(GlobalContext)

  const onSubmit = e => {
    e.preventDefault();

    const newCategory = {
      id: Math.floor(Math.random() * 100000000),
      name: text,
    }
    addCategory(newCategory);
  }

  
  const iconSelect = async () => {
    await axios('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/fa-4/src/icons.yml')
    .then(response => response.jsyaml())
    .then(data => console.log(data.icons))
  } 

  useEffect(() => {
    getCategories()
    iconSelect()
  }, []);

  return (
    <div className="categorias">
      <h3 className="mb-4">Categories</h3>
      <form onSubmit={onSubmit}>
        <input className="add-category mr-2" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Insert Categories"></input>
        <select id="select" name="threads-icon" class="fa-select">
        {/* {iconSelect.map(icon => ('<option value="fa-' + icon.id + '">' + icon + '</option>'))} */}
        </select>
        <button className="add earn btn-categories">Add Categories</button>
      </form>
      <ul className="list mt-5">
      { Object.keys(categories).length > 0 ?
        categories.map((category) => (
          <li className="mb-3" key={category._id}>
             <Button 
                  key={category.id}
                  className="table-delete-btn" 
                  variant="danger"
                  onClick={() => deleteCategory(category._id)}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </Button>
            { category.name === 'Car' ? (<span className="ml-3"><i class="fa fa-car" aria-hidden="true"></i></span>) : ''}
            { category.name === 'Home' ? (<span className="ml-3"><i class="fa fa-home" aria-hidden="true"></i></span>) : ''}
            { category.name === 'Bank' ? (<span className="ml-3"><i class="fa fa-university" aria-hidden="true"></i></span>) : ''}
            { category.name === 'Investiment' ? (<span className="ml-3"><i class="fa fa-money" aria-hidden="true"></i></span>) : ''}
            <span className="ml-3">{category.name}</span>
           
          </li>
        )): 'No categories add!'}
      </ul>
    </div>
  );
};

export default Categories;