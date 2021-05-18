import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function Categories() {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.catagoriesAPI.categories;
  const [category, setCategory] = useState("");

  return (
    <div className="categories">
      <form>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>

      <div className="col">
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
