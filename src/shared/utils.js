'use strict';

/**
 * Determine if user can edit job
 *
 * @param {User|Number} user object or user_id
 * @param {Job} job
 * @return boolean
 */
function userCanEditJob(user, job) {
  if (typeof user === 'number') {
    return user === job.user_id;
  }

  return user.is_admin || user.id === job.user_id;
}

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// @link http://blog.stevenlevithan.com/archives/parseuri
function parseUri (str) {
  var o   = parseUri.options,
    m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i   = 14;

  while (i--) uri[o.key[i]] = m[i] || "";

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });

  return uri;
};
parseUri.options = {
  strictMode: false,
  key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
  q:   {
    name:   "queryKey",
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};

/**
 * Is this code running in a Node.js environment?
 * @link http://stackoverflow.com/questions/4224606/how-to-check-whether-a-script-is-running-under-node-js
 *
 * @return boolean
 */
function isNode() {
  return (typeof module !== 'undefined' && this.module !== module);
}

/**
 * Is development?
 */
function isDev() {
  return isNode() && process & process.env && process.env.NODE_ENV === 'development';
}

module.exports = { userCanEditJob, parseUri, isNode, isDev };
