const Sub = require("../models/Subcategory");
const Product = require("../models/Product");
const slugify = require("slugify");

module.exports.create = async (req, res) => {
	try {
		const { name, parent } = req.body;
		res.json(await new Sub({ name, parent, slug: slugify(name) }).save());
	} catch (err) {
		console.log("SUB CREATE ERR ----->", err);
		res.status(400).send("Create sub failed");
	}
};

module.exports.list = async (req, res) =>
	res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());

module.exports.read = async (req, res) => {
	let sub = await Sub.findOne({ slug: req.params.slug }).exec();
	const products = await Product.find({ subs: sub })
		.populate("category")
		.exec();

	res.json({
		sub,
		products,
	});
};

module.exports.update = async (req, res) => {
	const { name, parent } = req.body;
	try {
		const updated = await Sub.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, parent, slug: slugify(name) },
			{ new: true }
		);
		res.json(updated);
	} catch (err) {
		res.status(400).send("Sub update failed");
	}
};

module.exports.remove = async (req, res) => {
	try {
		const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
		res.json(deleted);
	} catch (err) {
		res.status(400).send("Sub delete failed");
	}
};
