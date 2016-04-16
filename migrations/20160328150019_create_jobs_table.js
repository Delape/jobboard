
exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobs', function(t) {
    t.increments('id').primary();
    t.string('title').notNull();
    t.string('location').notNull();
    t.string('description').notNull();
    t.string('category').notNull();
    t.string('telecommute').notNull();
    t.string('company_name').notNull();
    t.string('company_url').notNull();
    t.string('company_logo_url').nullable();
    t.string('company_email').notNull();
    t.boolean('is_live').notNull();
    t.boolean('is_featured').notNull();
    t.dateTime('dt_created').notNull();
    t.dateTime('dt_updated').nullable();
    t.dateTime('dt_expires').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs');
};