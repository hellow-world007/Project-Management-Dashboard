import jwt from "jsonwebtoken";
import HttpError from "../models/http-error.js";
import Users from "../models/users.model.js";

const checkAuth = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("Authentication failed. No access token!");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    if (!decodedToken) {
      throw new Error("Unauthorized. Invalid token!");
    }

    const user = await Users.findById(decodedToken.userId).select("-password");

    if (!user) {
      throw new Error("User not found!");
    }

    // req.userData = { userId: decodedToken.userId };
    req.user = user;
    next();
  } catch (err) {
    const error = new HttpError("Token is invalid!", 403);
    return next(error);
  }
};

export default checkAuth;
