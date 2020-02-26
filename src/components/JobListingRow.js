'use strict';

const React = require('react');
const config = require('shared/config');

const JobListingRow = React.createClass({
  _renderJobImage(job) {
    let job_logo_url = job.company_logo_url || false;

    if (!job_logo_url) {
      return;
    }

    return (
      <div className="media-left">
        <img className="media-object" src={job_logo_url} alt={job.company_name} />
      </div>
    );
  },

  render() {
    let job = this.props.job;
    let job_category = config.jobs.categories[job.category];

    return (
      <a className="list-group-item" key={'job-' +job.id} href={`/jobs/${job.id}`}>
        <div className="media">
         {this._renderJobImage(job)}
          <div className="media-body">
            <div className="pull-right">
              <span>{ job.location }</span>
              <span className="label label-default">{ job_category }</span>
            </div>
            <span className="job-company">{ job.company_name }</span>
            <h4 className="media-heading">{ job.title }</h4>
          </div>
        </div>
      </a>
    );
  }
});

module.exports = JobListingRow;

