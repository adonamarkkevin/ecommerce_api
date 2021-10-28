const User = require("../models/User");
const Cart = require("../models/Cart");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports.createPaymentIntent = async (req, res) => {
	// console.log(req.body);
	const { couponApplied } = req.body;

	// later apply coupon
	// later calculate price

	// 1 find user
	const user = await User.findOne({ email: req.user.email }).exec();
	// 2 get user cart total
	const { cartTotal, totalAfterDiscount } = await Cart.findOne({
		orderdBy: user._id,
	}).exec();
	// console.log("CART TOTAL", cartTotal, "AFTER DIS%", totalAfterDiscount);

	let finalAmount = 0;

	if (couponApplied && totalAfterDiscount) {
		finalAmount = totalAfterDiscount * 100;
	} else {
		finalAmount = cartTotal * 100;
	}

	// create payment intent with order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: finalAmount,
		currency: "usd",
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
		cartTotal,
		totalAfterDiscount,
		payable: finalAmount,
	});
};
