angular.module('monitor')
  .controller 'EventListCtrl', ($scope) ->
    $scope.events = [
      { time: new Date, user: 'qhwa', action: 'update profile' }
      { time: new Date, user: 'qhwa', action: 'visit profile page' }
      { time: new Date, user: 'qhwa', action: 'login' }
    ]
