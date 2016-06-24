(function () {
  var login = angular.module('peopleManager.login');
  login.controller('newUserController', ['$scope',
                                         '$http',
                                         '$stateParams',
                                         '$state',
                                         'userService',
                                         'userFactory',
                                         'toaster',
                                         '$sessionStorage',
                                         '$localStorage',
  function ($scope, $http, $stateParams, $state, userService, userFactory, toaster, $sessionStorage, $localStorage) {
    $scope.user = {}
    $scope.createAccount = function(validForm) {
      if (!validForm) {
        return
      }
      if($localStorage.users === undefined){
        $localStorage.users = []
      }
      var enrolled = userIsEnrolled()

      if (enrolled) {
        toaster.warning('Account already exists you can login.')
      } else {
        $localStorage.users.push($scope.user)
        toaster.success('Account was created successfully. Now you can login.')
      }
      $state.go('login')
    };

    $scope.backToLogin = function() {
      $scope.user = {}
      $state.go('login')
    };

    // Funcion privada, no accesible mediante el scope desde la vista.
    function userIsEnrolled() {
      var enrolled = false
      $scope.users = $localStorage.users
      for(var i = 0; i < $scope.users.length; i++) {
        if(($scope.users[i].email === $scope.user.email) && ($scope.users[i].password === $scope.user.password)){
          enrolled = true
          $scope.user = $scope.users[i]
          break;
        }
      }
      return enrolled
    };

  }]);
})();
