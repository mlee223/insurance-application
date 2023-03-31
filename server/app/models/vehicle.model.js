module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define("vehicle", {
    applicationId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    vin: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.INTEGER,
    },
    makeModel: {
      type: Sequelize.STRING,
    },
  });

  return Vehicle;
};
