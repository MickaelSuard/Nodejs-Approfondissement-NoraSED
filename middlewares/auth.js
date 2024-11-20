const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); 
const config = require("../config");
const usersService = require("../api/users/users.service");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "Token not provided";
    }

    const decoded = jwt.verify(token, config.secretJwtToken);
    console.log('Token authenticated:', decoded);
    console.log('Token userId:', decoded.userId);
    const user = await usersService.get(decoded.userId);
    if (!user) {
      throw "User not found";
    }
    req.user = user;
    next();

  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
