const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const _ = require("lodash");

const userSchema = new mongoose.Schema(
	{
		name: String,
		email: {
			type: String,
			required: true,
			index: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		cart: {
			type: Array,
			default: [],
		},
		address: String,
		wishlist: [{ type: ObjectId, ref: "Product" }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
