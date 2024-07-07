import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, count } = req.body;
  const { price, title, image, inStock } = await Product.findById(productId);
  const user = req.userId;
  let quantity = 0;
  if (count > inStock) {
    res.status(201).send("محصول موجود نیست");
    return;
  }
  if (!user) {
    if (req.session.cart) {
      for (let i = 0; i < req.session.cart.products.length; i++) {
        if (req.session.cart.products[i].productId === productId) {
          req.session.cart.products[i].count += count;
          req.session.cart.cartTotal += count * price;
          req.session.cart.countTotal += count;
          quantity++;
        }
      }
      if (quantity === 0) {
        req.session.cart.products.push({
          productId,
          count,
          image,
          title,
          price,
        });
        req.session.cart.cartTotal += count * price;
        req.session.cart.countTotal += count;
      }
    } else {
      req.session.cart = {
        products: [{ productId, count, image, title, price }],
        cartTotal: count * price,
        countTotal: count,
      };
    }
  }
  // await Product.updateOne(
  //   { _id: productId },
  //   {
  //     $inc: {
  //       inStock: -count,
  //     },
  //   }
  // );
  res.status(201).send("محصول به سبد خرید اضافه شد");
});

//GET get user cart
export const getCart = asyncHandler(async (req, res) => {
  const user = req.userId;
  if (!user) {
    const sessionCart = await req.session;

    if (sessionCart?.cart) {
      res.status(201).json({
        products: sessionCart.cart.products,
        cartTotal: sessionCart.cart.cartTotal,
        countTotal: sessionCart.cart.countTotal,
      });
    } else {
      res.status(201).json({ message: "سبد خرید خالی است" });
    }
  }
  // else {
  //   const cart = await User.findById(user).populate("cart");
  //   if (!cart) {
  //     res.status(201).send("no product in cart");
  //   } else {
  //     const populatedCart = cart.cart;
  //     res.json(populatedCart);
  //   }
  // }
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId, count } = req.body;
  const cart = req.session.cart;
  let newSessionCart;
  for (let i = 0; i < cart.products.length; i++) {
    if (cart.products[i].productId === productId) {
      const price = cart.products[i].price;
      if (cart.products[i].count === count) {
        newSessionCart = cart.products.filter(
          (item) => !(item.productId === productId)
        );
        cart.products = newSessionCart;
        cart.cartTotal -= count * price;
        cart.countTotal -= count;
      } else {
        cart.products[i].count -= count;
        cart.cartTotal -= count * price;
        cart.countTotal -= count;
      }
    }
  }
  res.status(200).send("The product was removed from the cart");
});
