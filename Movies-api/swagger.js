const path = require("path");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies_app",
      version: "1.0.0",
    },
  },

  apis: [
    path.join(__dirname, "./api/movies/index.js"),
    path.join(__dirname, "./api/people/index.js"), 
    path.join(__dirname, "./api/users/index.js"), 
  ],
};

const swaggerSpec = swaggerDoc(options);

var swaggerInstall = function (app) {
  if (!app) {
    app = express();
  }

  app.get("/swagger.json", swaggerJson);
  app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

var swaggerJson = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
};

module.exports = swaggerInstall;