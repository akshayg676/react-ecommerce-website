const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");
const { route } = require("./userRouter");

// upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//upload image (only by admin)
router.post("/upload", auth, authAdmin, (req, res) => {
  try {
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "No files were uploaded" });

    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTMP(file.tempFilePath);
      return res.status(400).json({ msg: "File size too large" });
    }

    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      removeTMP(file.tempFilePath);
      return res.status(400).json({ msg: "File format not support" });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;
        removeTMP(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete image (only by admin)
router.post("/destroy", auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No image selected" });
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json("Image deleted");
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTMP = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
