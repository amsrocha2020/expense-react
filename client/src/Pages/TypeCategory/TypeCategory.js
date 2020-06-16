import React, { useContext, useEffect } from "react";

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
          <li className="mb-3" key={typecategory.id}>
            <button key={typecategory.id} onClick={() => deleteTypeCategories(typecategory._id)} className="delete-btn mr-3">x</button>
            {typecategory.name}
          </li>
        )): 'No type categories add!'}
      </ul>
    </div>
  );
};

export default TypeCategory;