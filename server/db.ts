import knex from "knex";

const config = {
  client: "sqlite3",
  connection: {
    filename: "./database/cities.db",
  },
  useNullAsDefault: true,
};

const db = knex(config);

export default db;
