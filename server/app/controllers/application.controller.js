const db = require("../models");
const Application = db.application;

// Create and Save a new Insurance Application
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.lastName) {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }

  // Create a Insurance Application
  const application = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate.substring(0, 10),
    address: JSON.stringify(req.body.address),
    vehicles: JSON.stringify(req.body.vehicles),
  };

  // Save application in the database
  Application.create(application)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Insurance Application.",
      });
    });
};

// Find a single Insurance Application with an id
exports.find = (req, res) => {
  const id = req.params.id;

  Application.findByPk(id)
    .then((data) => {
      if (data) {
        const application = {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate,
          address: JSON.parse(data.address),
          vehicles: JSON.parse(data.vehicles),
        };
        res.send(application);
      } else {
        res.status(404).send({
          message: `Cannot find Insurance Application with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Insurance Application with id=" + id,
      });
    });
};

// Update a Insurance Application by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const application = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate.substring(0, 10),
    address: JSON.stringify(req.body.address),
    vehicles: JSON.stringify(req.body.vehicles),
  };

  Application.update(application, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          message: "Insurance Application was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Insurance Application with id=${id}. Maybe Insurance Application was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Insurance Application with id=" + id,
      });
    });
};

// Delete a Insurance Application with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Application.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          message: "Insurance Application was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Insurance Application with id=${id}. Maybe Insurance Application was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Insurance Application with id=" + id,
      });
    });
};

// Validate the Insurance Application and return price
exports.validate = (req, res) => {
  const id = req.params.id;
  // find applicaty by pk and validate

  res.send({ price: Math.floor(Math.random() * 1000) });
};
