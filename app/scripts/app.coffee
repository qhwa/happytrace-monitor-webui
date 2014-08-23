'use strict'

angular.module('monitor', ['ngRoute', 'angularMoment'])
  .config ($routeProvider) ->

    $routeProvider

      .when '/',
        templateUrl: 'templates/dashboard.html'
        controller:  'DashboardCtrl'

      .when '/events',
        templateUrl: 'templates/events.html'
        controller:  'EventListCtrl'

  .config ($locationProvider) ->
    #$locationProvider.html5Mode(true).hashPrefix('!')
