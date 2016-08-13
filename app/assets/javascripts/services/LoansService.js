angular.module('library').factory('LoansService', ['$resource', function($resource) {
    return $resource('/loans.json', {}, {
        query:  {method: 'GET', isArray: true},
        create: {method: 'POST'}
    })
}]).factory('LoansSearchService', ['$resource', function($resource ) {
    return $resource('/search_loans.json', {}, {
        'searchLoans': {method: 'GET', isArray: true, params: {keywords: '@searchTerm'}}
    })
}]).factory('LoanService', ['$resource', function($resource) {
    return $resource('/loans/:loanId.json', {}, {
        show:   {method: 'GET'},
        update: {method: 'PUT',    params: {loanId: '@id'}},
        delete: {method: 'DELETE', params: {loanId: '@id'}}
    });
}]);
