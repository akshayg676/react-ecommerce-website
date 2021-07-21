import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
// import Loading from "../utils/loading/Loading";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "",
  _id: "",
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.catagoriesAPI.categories;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const history = useHistory();
  const params = useParams();

  const [products] = state.productsAPI.products;
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setEdit(true);
          setProduct(product);
          setImage(product.image);
        }
      });
    } else {
      setEdit(false);
      setProduct(initialState);
      setImage(false);
    }
  }, [params.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are noy Admin");

      const file = e.target.files[0];

      if (!file) return alert("File no exist");

      if (file.size > 1024 * 1024) return alert("File size too large"); // 1mb

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("Invalid File format");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setImage(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDelete = async () => {
    try {
      if (!isAdmin) return alert("You're not the Admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not Admin");
      if (!image) return alert("Select an Image");

      if (edit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, image },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, image },
          {
            headers: { Authorization: token },
          }
        );
      }

      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const styleUpload = {
    display: image ? "block" : "none",
  };
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <h3>Please wait . . .</h3>
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={image ? image.url : ""} alt="" />
            <span onClick={handleDelete}>X</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={edit}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            onChange={handleChangeInput}
            rows="5"
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            onChange={handleChangeInput}
            rows="7"
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{ backgroundColor: "green", color: "#fff" }}
        >
          {edit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
