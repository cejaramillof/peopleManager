(function () {
  var person = angular.module('peopleManager.person');
  person.service('peopleService', ['$http',
                                   '$stateParams',
                                   function ($http,
                                             $stateParams) {
    var urlBase = 'https://people-manager-api.herokuapp.com';
    var peopleService = {};

    peopleService.getAll = function () {
      return $http.get(urlBase + '/people');
    };

    peopleService.getById = function (personId) {
      return $http.get(urlBase + '/people/' + personId);
    };

    peopleService.destroy = function (personId) {
      return $http.delete(urlBase + '/people/' + personId);
    };

    peopleService.save = function(person) {
      if (person.id !== undefined) {
        return $http.put(urlBase + '/people/' + person.id  , { person: person })
      } else {
        return $http.post(urlBase + '/people', { person: person })
      }
    }

    return peopleService;
  }]);
})();
