exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(table){
    table.string('username').unique().primary();
    table.string('email').unique();
    table.specificType('hashed_password', 'char(60)')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
