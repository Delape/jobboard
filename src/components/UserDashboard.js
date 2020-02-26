'use strict';

const React = require('react');
const JobListingRow = require('components/JobListingRow');
const sdk = require('server/sdk');
const sharedUtils = require('shared/utils')

const UserDashboard = React.createClass({
  statics: {
    title: 'User Dashboard',
    fetchData(params) {
      let user = params.user;
      return sharedUtils.promiseAll({
        jobs: sdk.jobs().findByUserId(user.id),
        all_inactive_jobs: sdk.jobs().allInactive(),
        user_inactive_jobs: sdk.jobs().findInactiveByUserId(user.id),
      });
    }
  },

  render() {
    let jobs = this.props.data.jobs || [];

    return (
      <div className="job-list">
        <h1>Your Job Listings</h1>
        <div className="panel panel-default">
          <div className="list-group">
            { jobs.length === 0 ? this._renderNoJobs() : undefined}
            { jobs.filter(function (job) {
                return job.is_live;
            }).map(function (job) {
                return <JobListingRow job={job} key={'job_' + job.id} />;
            })}
          </div>
        </div>
        {this._renderInactiveJobs()}
      </div>
    );
  },

  _renderInactiveJobs()
  {
    if (!this.props.user) {
      return;
    }
    let jobs;
    if (!this.props.user.is_admin) {
        jobs = this.props.data.user_inactive_jobs || [];
    } else {
        jobs = this.props.data.all_inactive_jobs || [];
    }
    if ( jobs.length > 0 ){
        return (
            <div>
                <h1>Awaiting Approval</h1>
                <div className="panel panel-default">
                <div className="list-group">
                    { jobs.length === 0 ? this._renderNoJobs() : undefined}
                    { jobs.map(function (job) {
                        return <JobListingRow job={job} key={'job_' + job.id} />;
                    })}
                </div>
                </div>
            </div>
        );
    }
  },

  _renderNoJobs() {
    return (
      <div className="panel-body">
        <p>You have not created any job listings yet.</p>
        <p>Maybe consider <a href="/jobs/create">adding one?</a></p>
      </div>
    );
  }
});

module.exports = UserDashboard;
