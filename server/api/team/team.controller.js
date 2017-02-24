'use strict';

var _ = require('lodash');

function Team(req) {
  return req.app.get('models').Team;
}

// Get list of teams
exports.index = function (req, res) {
  Team(req)
    .findAll()
    .then(function (teams) {
      return res.status(200).json(teams);
    })
    .catch(function (err) {
      if (err) {
        return handleError(res, err);
      }
    });
};

// Get a single team
exports.show = function (req, res) {
  Team
    .findById(req.params.id)
    .then(function (team) {
      if (!team) {
        return res.status(404).send('Not Found');
      }
      return res.json(team);
    })
    .catch(function (err) {
      if (err) {
        return handleError(res, err);
      }
    });
};

// Creates a new team in the DB.
exports.create = function (req, res) {
  Team
    .create(req.body)
    .then(function (team) {
      return res.status(201).json(team);
    })
    .catch(function (err) {
      if (err) {
        return handleError(res, err);
      }
    });
};

// Updates an existing team in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Team
    .findById(req.params.id)
    .then(function (team) {
      if (!team) {
        return res.status(404).send('Not Found');
      }
      var updated = _.merge(team, req.body);
      updated.save(function (err) {
        if (err) {
          return handleError(res, err);
        }
        return res.status(200).json(team);
      });
    })
    .catch(function (err) {
      if (err) {
        return handleError(res, err);
      }
    });
};

// Deletes a team from the DB.
exports.destroy = function (req, res) {
  Team
    .findById(req.params.id)
    .then(function (team) {
      if (!team) {
        return res.status(404).send('Not Found');
      }
      team.destroy(function (err) {
        if (err) {
          return handleError(res, err);
        }
        return res.status(204).send('No Content');
      });
    })
    .catch(function (err) {
      if (err) {
        return handleError(res, err);
      }
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
