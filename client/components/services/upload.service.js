/**
 * Created by gabrielmuscalu on 24/02/17.
 */
(function(){
  'use strict';
  UploadService.$inject = ['Upload'];
  function UploadService (Upload) {
    this.uploadFile = function(file) {
      return Upload.upload({
        url: 'api/upload',
        data: {file: file}
      })
    }
  }
  angular.module('statsApp').service('UploadService', UploadService);
})();
