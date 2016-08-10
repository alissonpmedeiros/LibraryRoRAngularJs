angular.module('library').factory('StatesService', ['$resource', function($resource) {
    return $resource('/states.json', {}, {
        query:  {method: 'GET', isArray: true},
        create: {method: 'POST'}
    })
}]).factory('StateService', ['$resource', function($resource) {
    return $resource('/states/stateId.json', {}, {
        show:   {method: 'GET'},
        update: {method: 'PUT',    params: {stateId: '@id'}},
        delete: {method: 'DELETE', params: {stateId: '@id'}}
    })
}]);