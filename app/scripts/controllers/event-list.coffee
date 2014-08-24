angular.module('monitor')
  .controller 'EventListCtrl', ($scope, $http) ->
    $http
      url: '/api/events.json'
    .success (result) ->
      if result.success
        $scope.events = result.data.events

    .error (data, result, status, config) ->
      console.error 'fail to load events'
