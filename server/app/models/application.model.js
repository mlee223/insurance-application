module.exports = (sequelize, Sequelize) => {
  const InsuranceApplication = sequelize.define("application", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    birthDate: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    vehicles: {
      type: Sequelize.STRING,
    },
  });

  return InsuranceApplication;
};
