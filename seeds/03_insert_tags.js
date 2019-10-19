'use strict';

const faker = require('faker');
const config = require('shared/config');

exports.seed = function(knex, Promise) {
  function generateTagData(data) {
    let dt_created = new Date();
    let fakeData = {
      name: faker.hacker.abbreviation(),
      is_active: true,
      dt_created
    };

    return Object.assign(fakeData, data);
  }

    // Deletes ALL existing entries
    // and restart primary key sequence
    return Promise.join(
      knex.raw("TRUNCATE TABLE tags RESTART IDENTITY CASCADE")
    ).then(_ => Promise.join(
        // Inserts seed entries
        knex('tags').insert(generateTagData()),
        knex('tags').insert(generateTagData()),
        knex('tags').insert(generateTagData()),
        knex('tags').insert(generateTagData()),
        knex('tags').insert(generateTagData()),
        knex('tags').insert(generateTagData())
    ));
};
