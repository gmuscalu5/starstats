(function () {
  'use strict';
  MainController.$inject = ['UploadService', '$mdDialog'];
  function MainController(UploadService, $mdDialog) {
    var vm = this;
    vm.determinateValue = 0;
    vm.upload = upload;
    function upload(file) {
      if (file) {
        UploadService.uploadFile(file).then(function (resp) {
          vm.determinateValue = 100;
          showDialog('File ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data.name)
        }, function (err) {
          showDialog('Error status: ' + err.status)
        }, function (evt) {});
      }
    }
    function showDialog (message) {
      var alert = $mdDialog.alert()
        .title('Upload Status')
        .textContent(message)
        .ariaLabel('Upload Status')
        .ok('OK');

      $mdDialog.show(alert).then(function() {
        vm.determinateValue = 0;
      }, function() {
        vm.determinateValue = 0;
      });
    }
  }
  angular.module('statsApp').controller('MainController', MainController)
})();
