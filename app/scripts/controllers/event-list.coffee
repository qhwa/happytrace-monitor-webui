angular.module('monitor')
  .controller 'EventListCtrl', ($scope, $http) ->

    _.extend $scope,

      init: ->
        $scope.count = 0
        $scope.upcoming = 0

        @loadData()
        @initPusher()

      loadData: ->
        $http( url: '/api/events.json' )
        .success (result) ->
          if result.success
            $scope.events = result.data.events
            $scope.count  = result.data.count

        .error (data, result, status, config) ->
          console.error 'fail to load events'

      initPusher: ->

        # Enable pusher logging - don't include this in production
        # TODO: remove it
        Pusher.log = -> console.info.bind( console )

        new Pusher('d52ea80b6a603fd924f8')
          .subscribe('project_event_created_53f9a11171687739dc010000')
          .bind 'new_event', (data) ->
            $scope.$apply ->
              console.log data.count, '-', $scope.count, 'new events received'
              $scope.upcoming = data.count - $scope.count


    $scope.init()
