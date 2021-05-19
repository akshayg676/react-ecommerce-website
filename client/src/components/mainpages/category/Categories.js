import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";

function Categories() {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.catagoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.catagoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data);
      }

      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setId(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <form onSubmit={createCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          placeholder="Add Category"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          type="submit"
          style={{ backgroundColor: "green", color: "#fff" }}
        >
          {onEdit ? "Update" : "Save"}
        </button>
      </form>

      <div className="col">
        {categories.length === 0 ? (
          <h4>No Category to display</h4>
        ) : (
          <>
            <h4>Current Categories</h4>
            {categories.map((category) => (
              <div className="row" key={category._id}>
                <p>{category.name}</p>
                <div>
                  <button
                    onClick={() => editCategory(category._id, category.name)}
                    style={{ backgroundColor: "skyblue", color: "#fff" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    style={{ backgroundColor: "Crimson", color: "#fff" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Categories;
