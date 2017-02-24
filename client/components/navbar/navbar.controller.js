(function () {
  'use strict';
  NavbarController.$inject = ['$state'];
  function NavbarController($state) {
    var vm = this;
    vm.menu = [{
      'label': 'Home',
      'state': 'main'
    }];
    vm.goTo = goTo;
    function goTo (state) {
      $state.go(state);
    }
  }

  angular.module('statsApp').controller('NavbarController', NavbarController);
})();
