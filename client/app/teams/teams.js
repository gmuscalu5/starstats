/**
 * Created by gabrielmuscalu on 24/02/17.
 */
'use strict';

angular.module('statsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teams', {
        url: '/teams',
        templateUrl: 'app/teams/teams.html',
        controller: 'TeamsController as ctrl'
      });
  });
