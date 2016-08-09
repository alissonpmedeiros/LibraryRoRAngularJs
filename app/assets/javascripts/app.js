
var controllers, library;

controllers = angular.module('controllers', []);

library = angular.module('library',
    [
        'ngCookies',
        'ipCookie',
        'ui.router',
        'templates',
        'ngRoute',
        'ngResource',
        'controllers',
        'ng-token-auth'

    ]
);

//routes

library.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('auth:login-success', function() {
        $location.path('/');
    });
}]);

library.config([
    '$routeProvider', function($routeProvider, $httpProvider) {
        return $routeProvider.when('/', {           // HOME ROUTE
            templateUrl: "home/index.html",
            controller: "HomeController"
        }).when('/books', {                         // BOOKS ROUTES
            templateUrl: "book/index.html",
            controller:  "BooksController"
        }).when('/books/new', {
            templateUrl: "book/new.html",
            controller:  "BooksController"
        }).when('/books/:bookId', {
            templateUrl: "book/show.html",
            controller:  "BooksController"
        }).when('/books/:bookId/edit', {
            templateUrl: "book/edit.html",
            controller:  "BooksController"
        }).when('/authors', {                       //AUTHORS ROUTES
            templateUrl: "author/index.html",
            controller:  "AuthorsController"
        }).when('/authors/new', {
            templateUrl: "author/new.html",
            controller:  "AuthorsController"
        }).when('/authors/:authorId', {
            templateUrl: "author/show.html",
            controller:  "AuthorsController"
        }).when('/authors/:authorId/edit', {
            templateUrl: "author/edit.html",
            controller:  "AuthorsController"
        }).when('/categories', {                       //CATEGORIES ROUTES
            templateUrl: "category/index.html",
            controller:  "CategoriesController"
        }).when('/user_login', {                             // AUTHENTICATE USER
            templateUrl: "user/_login.html",
            controller:  "NavController"
        }).when('/admin_login', {                             // AUTHENTICATE USER
            templateUrl: "user/_login.html",
            controller:  "NavController"
        }).when('/user_register', {
            templateUrl: "user/_register.html",
            controller:  "NavController"
        }).otherwise({                              //OTHERWISE ROUTE
            redirectTo: '/'
        });
    }
]);

