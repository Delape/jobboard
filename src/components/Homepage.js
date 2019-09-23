'use strict';

const React = require('react');
const JobList = require('components/JobList');
const settings = require('shared/settings');

const Homepage = React.createClass({
  statics: {
    title: settings.HOMEPAGE_TITLE,
    fetchData(params) {
      return JobList.fetchData(params);
    }
  },

  render() {
    return (
      <div>
        <JobList {...this.props} />
      </div>
    );
  }
});

module.exports = Homepage;
