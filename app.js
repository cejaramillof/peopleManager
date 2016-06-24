// Archivo principal de aplicación AngularJS
(function () {
  // Carga de Módulos
  var mainApp = angular.module('peopleManager', ['ui.router',
                                                 'ui.gravatar',
                                                 'ui.bootstrap',
                                                 'ngStorage',
                                                 'toaster',
                                                 'peopleManager.person',
                                                 'peopleManager.login']);
//                                                 'peopleManager.error']);

  // Ruta por default
  mainApp.run(['$state', function ($state) {
     $state.transitionTo('login');
  }]);
  // Configuración de routing interno
  // UI-Route
  mainApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('login', {
              url: '/login',
              templateUrl: './components/login/views/loginView.html',
              controller: 'loginController'
          })
          .state('newaccount', {
              url: '/login/new',
              templateUrl: './components/login/views/newAccount.html',
              controller: 'newUserController'
          })
          .state('newperson', {
              url: '/people/new',
              templateUrl: './components/person/views/newPerson.html',
              controller: 'peopleController'
          })
          .state('people', {
              url: '/people',
              templateUrl: './components/person/views/personList.html',
              controller: 'peopleController'
          })
          .state('personprofile', {
            url: '/people/:id',
              templateUrl: './components/person/views/showPerson.html',
              controller: 'peopleController'
          })
          .state('error', {
            url: '/error',
              templateUrl: './components/error/views/error.html',
              controller: 'errorController'
          })
        $urlRouterProvider.otherwise('login');
    }]);
})();
