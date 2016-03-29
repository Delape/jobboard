'use strict';

// Babel register ONLY for 'components' folder so there is no compile step
require("babel-register")({
  presets: ['react'],
  only: /components/,
  extensions: [".jsx", ".js"]
});

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const express = require('express');
const bodyParser = require('body-parser');
// const passport = require('passport');

const routes = require('shared/routes');
const sdk = require('server/sdk');

// React components
const App = require('components/App');
const Error404 = require('components/Error404');

let app = express();
let isDevEnv = process.env.NODE_ENV === 'development';

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse body params
app.use(bodyParser.json())
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

function wrapReactComponentInLayout(response, component, props = {}, layout = 'layout') {
  let jsxToRender = React.createElement(App, { children: [component] });
  response.render(layout, {
    content: ReactDOMServer.renderToString(jsxToRender),
    react_props: JSON.stringify(props)
  });
}

// Match shared routes rendered by React components
app.get('*', function(req, res) {
  let match = routes.match(req.url);
  if (match) {
    // Add query string data to serverProps for fetchData
    let serverProps = Object.assign({}, match.props, {
      url: match.urlParts.path,
      queryString: match.urlParts.queryKey
    });

    // Fetch data server side
    match.fetchData(serverProps)
      .then(function (data) {
        let props = {
          data,
          qs: match.urlParts.queryKey
        };
        let layout = match.component.layout || 'layout';
        wrapReactComponentInLayout(res, match.factory(props), props, layout);
      }).catch(function (err) {
        // @TODO: Create error template to show errors in
        if (isDevEnv) {
          console.log(err, err.stack.split('\n'));
        }

        res.status(500).render('layout', {
          content: err,
          react_props: JSON.stringify({})
        });
      });
  } else {
    // Show 404 route
    let content = ReactDOMServer.renderToString(React.createElement(Error404));
    res.status(404).render('layout', {
      content,
      react_props: JSON.stringify({})
    });
  }
});

// Post new job
app.post('/jobs', function (req, res) {
  sdk.jobs()
    .create(req.body)
    .then(function(job) {
      // res.json({ job });
    }).catch(function (err) {
      if (isDevEnv) {
        console.log(err, err.stack.split('\n'));
      }

      let props = { data: req.body }; // should re-fill form fields
      wrapReactComponentInLayout(res, JobForm, props, layout);
    });
});

/**
 * @TODO: User Accounts
 *
 * I was originally going to create user accounts, logins, etc. but then I
 * decided against it in favor of making the job board *really* simple so it
 * could be launched sooner rather than later. - Vance L
 */


// Configure Passport for user authentication
// passport.use(User.passportTokenStrategy());
// passport.use(User.passportLoginStrategy());

// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.json({ user: req.user });
//   }
// );
//
// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.json({ user: req.user });
//   }
// );
//
// app.get('/access_token',
//   passport.authenticate('bearer', { session: false }),
//   function(req, res) {
//     res.json({ user: req.user });
//   }
// );

// Start server
let server = app.listen(process.env.PORT || 1339, function () {
  let host = server.address().address;
  let port = server.address().port;

  if (host === '::') {
    host = 'localhost';
  }

  console.log('Example app listening at http://%s:%s', host, port);
});
