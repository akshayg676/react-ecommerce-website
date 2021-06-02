const Category = require("../models/categoryModel");
const Products = require("../models/productModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      // only admin can create, delete and update
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "Category already exist" });

      const newCategory = new Category({ name });
      await newCategory.save();
      res.json("new category created");
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const product = await Products.findOne({ category: req.params.id });
      if (product)
        return res
          .status(400)
          .json({ msg: "Please delete all products under this category" });

      await Category.findOneAndDelete({ _id: req.params.id });
      res.json({ msg: " Deleted a Category" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;

      await Category.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { name }
      );
      res.json({ msg: " Updated a Category" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
