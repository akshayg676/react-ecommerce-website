import { useState, useEffect } from "react";
import axios from "axios";

function CatagoriesAPI() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/category");

      setCategories(res.data);
    };
    getCategories();
  }, []);
  return { categories: [categories, setCategories] };
}

export default CatagoriesAPI;
