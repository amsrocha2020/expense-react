import React, { useContext, useEffect } from "react";

import { Button } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

const TypeCategory = () => {

//   const [text, setText] = useState('');
  const { typecategories, getTypeCategories } = useContext(GlobalContext);
  const { deleteTypeCategories } = useContext(GlobalContext);

  useEffect(() => {
    getTypeCategories();
  }, []);

  return (
    <div className="tipoCategorias">
      <h3 className="mb-4">Type of Categories</h3>
      {/* <form>
        <input className="add-category mr-2" type="text" value={text} placeholder="Insert Type Categories"></input>
        <button className="add earn btn-categories">Add Categories</button>
      </form> */}
      <ul className="list mt-5">
      { Object.keys(typecategories).length > 0 ?
        typecategories.map((typecategory) => (
          <li className="mb-3" key={typecategory._id}>
            <Button 
                  key={typecategory.id}
                  className="table-delete-btn" 
                  variant="danger"
                  onClick={() => deleteTypeCategories(typecategory._id)}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </Button>
            {/* <button key={typecategory.id} onClick={() => deleteTypeCategories(typecategory._id)} className="delete-btn mr-3">x</button> */}
            <span className="ml-3">{typecategory.name}</span>
          </li>
        )): 'No type categories add!'}
      </ul>
    </div>
  );
};

export default TypeCategory;