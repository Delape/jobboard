exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(t) {
    t.increments('id').primary();
    t.string('name').notNull().unique();
    t.boolean('is_active').notNull();
    t.dateTime('dt_created').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
