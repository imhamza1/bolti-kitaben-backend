  var express = require("express");
var { Category } = require("../../model/Category");
var validateCategory = require("../../middleware/validateCategory");
const auth  = require("../../middleware/auth");

var router = express.Router();

router.get("/", async (req, res) => {
  let categories = await Category.find();
  res.send(categories);
});

router.post("/",auth, validateCategory, async (req, res) => {
  console.log(req.body.name);
  let category = new Category();
  category.name = req.body.name;
  await category.save();
  res.send(category);
});

router.put("/:id",auth, validateCategory, async (req, res) => {
  console.log(req.body);
  let category = await Category.findById(req.params.id);
  category.name = req.body.name;
  await category.save();

  res.send(category);
});

router.delete("/:id",auth, async (req, res) => {
  let category = await Category.findByIdAndRemove(req.params.id);
  res.send(category);
});

module.exports = router;
