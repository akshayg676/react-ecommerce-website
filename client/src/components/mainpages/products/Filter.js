import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function Filter() {
  const state = useContext(GlobalState);
  const [categories] = state.catagoriesAPI.categories;
  console.log(categories);
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    // e.preventDefault()
    setCategory(e.target.value);
    console.log(category);
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;
