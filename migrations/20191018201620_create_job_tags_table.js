exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobs_tags', function(t) {
    t.increments('id').primary();
    t.integer('job_id').index().references('id').inTable('jobs').onDelete('CASCADE');
    t.integer('tag_id').index().references('id').inTable('tags').onDelete('CASCADE');
    t.dateTime('dt_created').notNull();
    t.unique(['job_id', 'tag_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs_tags');
};
