

exports.up = function (knex) {
  return knex.schema.createTable('cities', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('state');
    table.string('country').notNullable();
    table.integer('tourist_rating').defaultTo(3);
    table.date('date_established');
    table.integer('estimated_population');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cities');
};