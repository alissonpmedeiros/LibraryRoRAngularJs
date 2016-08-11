angular.module('library').factory('AddressesService', ['$resource', function($resource) {
    return $resource('/addresses.json', {}, {
        query:  {method: 'GET', isArray: true},
        create: {method: 'POST'},
    })
}]).factory('AddressService', ['$resource', function($resource) {
    return $resource('/addresses/:addressId.json', {}, {
        show:   {method: 'GET'},
        update: {method: 'PUT',    params: {addressId: '@id'}},
        delete: {method: 'DELETE', params: {addressId: '@id'}}
    });
}]);
