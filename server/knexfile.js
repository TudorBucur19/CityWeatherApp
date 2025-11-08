module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/cities.db",
    },
    useNullAsDefault: true,
  },
};
