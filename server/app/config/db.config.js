module.exports = {
  HOST: "127.0.0.1",
  USER: "db_user",
  PASSWORD: "123456",
  DB: "test_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
