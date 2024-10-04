import Users from "../models/user.model.js";
import Products from "../models/product.model.js";
import HttpError from "../models/http-error.js";
import ProductStats from "../models/productStat.model.js";
import Transactions from "../models/transactions.model.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Products.find();

    if (!products) {
      return next(new HttpError("Products not found", 404));
    }

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const productStat = await ProductStats.findOne({
          productId: product._id,
        });

        return {
          ...product._doc,
          productStat,
        };
      })
    );

    res.status(200).json({ products: productsWithStats });
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Users.find({ role: "user" }).select("-password");

    if (!customers) {
      return next(new HttpError("Users not found", 404));
    }

    res.status(200).json({ customers: customers });
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

export const getTransactions = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const transactions = await Transactions.find().skip(skip).limit(limit);
    const totalTransactions = await Transactions.countDocuments();

    if (!transactions.length) {
      return next(new HttpError("No transactions found", 404));
    }

    res.status(200).json({
      transactions: transactions,
      currentPage: page,
      totalPages: Math.ceil(totalTransactions / limit),
    });
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

export const getGeography = async (req, res, next) => {
  try {
    const users = await Users.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryIS03 = getCountryIso3(country);
      if (!acc[countryIS03]) {
        acc[countryIS03] = 0;
      }
      acc[countryIS03]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json({ locations: formattedLocations });
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};
