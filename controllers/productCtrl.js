const Products = require("../models/productModel");

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const product = await Products.find();
      if (!product)
        return res.status(400).json({ msg: "product does not exist" });
      res.json(product);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        image,
        category,
      } = req.body;
      if (!image) return res.status(400).json({ msg: "Add an image" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "Product already exist" });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        image,
        category,
      });

      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        image,
        category,
      } = req.body;
      //   if (!image) return res.status(400).json({ msg: "Add an image" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          image,
          category,
        }
      );

      res.json({ msg: "Updated a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
