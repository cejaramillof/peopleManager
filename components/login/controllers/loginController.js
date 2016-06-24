(function () {
  var login = angular.module('peopleManager.login')
  login.controller('loginController', ['$scope',
                                       '$http',
                                       '$state',
                                       '$stateParams',
                                       'userService',
                                       'userFactory',
                                       'toaster',
                                       '$sessionStorage',
                                       '$localStorage',
  function ($scope, $http, $state, $stateParams, userService, userFactory, toaster, $sessionStorage, $localStorage) {

    $scope.user = {}

    // Watch verifica cambios en el estado de los objetos y ejecuta acciones
    $scope.$watch(function () { return userFactory.getCurrentUser(); }, function (newValue, oldValue) {
      if (newValue !== undefined && newValue !== null && newValue !== oldValue) {
        console.log('Current User ha cambiado')
      }
    });

    $scope.login = function() {
      $scope.isEnrolled = false
      if($scope.user && $scope.user.email && $scope.user.password) {
        $scope.isEnrolled = userIsEnrolled()
      }
      if($scope.isEnrolled) {
        userFactory.setCurrentUser($scope.user)
        $sessionStorage.currentUser = $scope.user
        toaster.success('Login successful !')
        $state.go('people')
      } else {
        toaster.error('User does not exist. Please check email/password.')
      }
    };

    $scope.signIn = function() {
      $state.go('newaccount');
    };

    // Funcion privada, no accesible mediante el scope desde la vista.
    function userIsEnrolled() {
      var enrolled = false
      $scope.users = $localStorage.users
      for(var i = 0; i < $scope.users.length; i++) {
        if(($scope.users[i].email === $scope.user.email) &&
            ($scope.users[i].password === $scope.user.password)){
          enrolled = true
          $scope.user = $scope.users[i]
          break;
        }
      }
      return enrolled
    };
  }]);
})();
