'use strict';

const React = require('react');
const JobListingRow = require('components/JobListingRow');
const sdk = require('server/sdk');
const settings = require('shared/settings');

const JobList = React.createClass({
  statics: {
    fetchData(params) {
      return sdk.jobs().allActive();
    }
  },

  render() {
    let jobs = this.props.data || [];
    let jobCount = jobs.length;

    return (
      <div className="job-list">
        <h1>{settings.JOB_LIST_TITLE}</h1>
        <div className="panel panel-default">
          <div className="list-group">
            { jobs.length === 0 ? this._renderNoJobs() : undefined}
            { jobs.map(function (job) {
                let tag_names = sdk.jobs().getJobTagNames(job.id);
              return <JobListingRow job={job} key={'job_' + job.id} tag_names={tag_names} />;
            })}
          </div>
        </div>
        {this._renderJobCount(jobCount)}
      </div>
    );
  },

  _renderNoJobs() {
    return (
      <div className="panel-body">
        <p>No jobs to show :-(.</p>
        <p>Maybe consider <a href="/jobs/create">adding one?</a></p>
      </div>
    );
  },

  _renderJobCount(jobCount) {
    if (!jobCount) {
      return;
    }

    return <p className="text-center">Showing {jobCount} jobs</p>;
  }
});

module.exports = JobList;
