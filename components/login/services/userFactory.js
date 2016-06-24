(function () {
  var login = angular.module("peopleManager.login");
  login.factory('userFactory', [function () {
    var self = this,
    factory = {};

    factory.setCurrentUser = function (user) {
      return self.user = user;
    }

    factory.getCurrentUser = function () {
      return self.user;
    }

    return factory;
  }]);
})();
