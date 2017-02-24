'use strict';

angular.module('statsApp')
  .controller('MainCtrl', function ($scope, $http, Upload) {
    $scope.awesomeThings = [];

    $http.get('/api/teams').then(function (response) {
      $scope.awesomeThings = response.data;
    });

    $scope.submit = function () {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };

    $scope.upload = function (file) {
      Upload.upload({
        url: 'api/upload',
        data: {file: file, 'username': $scope.username}
      }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
        console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };
  });
