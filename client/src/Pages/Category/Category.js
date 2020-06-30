import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../context/GlobalState";

const Categories = () => {
  const [text, setText] = useState('');
  const { categories, getCategories } = useContext(GlobalContext);
  const { addCategory, deleteCategory } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newCategory = {
      id: Math.floor(Math.random() * 100000000),
      name: text,
    }

    addCategory(newCategory);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="categorias">
      <h3 className="mb-4">Categories</h3>
      <form onSubmit={onSubmit}>
        <input className="add-category mr-2" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Insert Categories"></input>
        <button className="add earn btn-categories">Add Categories</button>
      </form>
      <ul className="list mt-5">
      { Object.keys(categories).length > 0 ?
        categories.map((category) => (
          <li className="mb-3" key={category._id}>
            <button key={category.id} onClick={() => deleteCategory(category._id)} className="delete-btn mr-3">x</button>
            {category.name}
          </li>
        )): 'No categories add!'}
      </ul>
    </div>
  );
};

export default Categories;