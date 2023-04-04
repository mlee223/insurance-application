module.exports = (app) => {
  const applications = require("../controllers/application.controller.js");

  var router = require("express").Router();

  // Create a new Insuranace Application
  router.post("/", applications.create);

  // Retrieve a single Insuranace Application with id
  router.get("/:id", applications.find);

  // Update a Insuranace Application with id
  router.put("/:id", applications.update);

  // Delete a Insuranace Application with id
  router.delete("/:id", applications.delete);

  // Validate a Insurance Application and Get price quote
  router.post("/:id/validate", applications.validate);

  app.use("/api/applications", router);
};
