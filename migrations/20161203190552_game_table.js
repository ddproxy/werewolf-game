
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('games', function(table){
    table.string('title');
    table.string('id').notNullable().unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
