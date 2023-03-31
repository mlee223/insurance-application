module.exports = (app) => {
  const applications = require("../controllers/application.controller.js");

  var router = require("express").Router();

  // Create a new Insuranace Application
  router.post("/", applications.create);

  // Retrieve all Insuranace Applications
  router.get("/", applications.findAll);

  // Retrieve all published Insuranace Applications
  router.get("/published", applications.findAllPublished);

  // Retrieve a single Insuranace Application with id
  router.get("/:id", applications.findOne);

  // Update a Insuranace Application with id
  router.put("/:id", applications.update);

  // Delete a Insuranace Application with id
  router.delete("/:id", applications.delete);

  // Delete all Insuranace Applications
  router.delete("/", applications.deleteAll);

  app.use("/api/applications", router);
};
