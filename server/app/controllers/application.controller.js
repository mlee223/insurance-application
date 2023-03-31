const db = require("../models");
const Application = db.application;
const Op = db.Sequelize.Op;

// Create and Save a new Insurance Application
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.lastName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Insurance Application
  const application = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    address: JSON.stringify(req.body.address),
    vehicle: JSON.stringify(req.body.vehicle),
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

// Retrieve all Insurance Applications from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { firstName: { [Op.like]: `%${title}%` } } : null;

  Application.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Insurance Applications.",
      });
    });
};

// Find a single Insurance Application with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Application.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
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

  Application.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
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

// Delete all Insurance Applications from the database.
exports.deleteAll = (req, res) => {
  Application.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Insurance Applications were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Insurance Applications.",
      });
    });
};

// find all published Insurance Application
exports.findAllPublished = (req, res) => {
  Application.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Insurance Applications.",
      });
    });
};
