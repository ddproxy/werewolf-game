exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.string('game_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.dropColumn('game_id')
  })
};
