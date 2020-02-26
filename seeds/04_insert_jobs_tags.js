'use strict';

const faker = require('faker');
const config = require('shared/config');

exports.seed = function(knex, Promise) {
    let now = new Date();

    return Promise.join(
        // Deletes ALL existing entries
        knex('jobs_tags').del(),

        // Inserts seed entries
        knex('jobs_tags').insert({ job_id: 1, tag_id: 1, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 1, tag_id: 2, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 1, tag_id: 3, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 1, tag_id: 4, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 2, tag_id: 1, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 2, tag_id: 3, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 2, tag_id: 4, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 3, tag_id: 2, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 3, tag_id: 4, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 4, tag_id: 1, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 4, tag_id: 2, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 5, tag_id: 1, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 5, tag_id: 2, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 5, tag_id: 4, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 6, tag_id: 1, dt_created: now}),
        knex('jobs_tags').insert({ job_id: 6, tag_id: 4, dt_created: now}),
    );
};
