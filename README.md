# Techlahoma Job Board

Node.js job board used to power [Techlahoma Jobs](https://jobs.techlahoma.org).

## Installation

Use Git to clone this app, then:

```
npm install
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
