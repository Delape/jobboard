# Techlahoma Job Board

Node.js job board used to power [Techlahoma Jobs](https://jobs.techlahoma.org).

## Installation

Use Git to clone this app, then:

```
npm install
```

### ENV Variables Setup

Then create an `.env` file in the root directory file with the following
contents (the app will not start without this file, and will throw an error if
 any ENV variables are missing):

```
export NODE_PATH="./src"
export NODE_ENV="development"
export DATABASE_URL="postgres://user@localhost/joblahoma"
export COOKIE_SECRET="blah blah blah - something random here"
export JOBS_DAYS_TO_EXPIRE=30
export USER_TOKEN_DAYS_TO_EXPIRE=30
```

### Database Setup

Ensure `knex.js` is installed globally:

```
npm install -g knex
```

Run the database migrations:

```
knex migrate:latest
```

Run the database seeds if you want to see some fake data or run the tests:

```
knex seed:run
```

## Commands

Start the server with a single command:

```
npm run start
```

Transpile all the ES6/ES2015 client-side JavaScript for browsers

```
npm run build
```

Minify the JavaScript bundle for production use

```
npm run minify
```

## Customization

There are currently a few values that can be changed to customize the job board.
```
    DOMAIN_URL
    HEADER_TITLE
    JOB_LIST_TITLE
    HOMEPAGE_TITLE
```
These can be found in `src/shared/settings.js`
Edit `HEADER_TITLE` to change the title on top of the website or `JOB_LIST_TITLE` to modify the text on top of the jobs' list.
