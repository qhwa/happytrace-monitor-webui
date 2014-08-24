angular.module('monitor')
  .controller 'EventListCtrl', ($scope, $http) ->

    _.extend $scope, {

      init: ->
        $scope.count = 0
        $scope.upcoming = 0
        $scope.events = []

        @reload()
        @initPusher()

      reload: ->
        @loadData().success (result) ->
          if result.success
            $scope.events = result.data.events
            $scope.count  = result.data.count

        .error (data, result, status, config) ->
          console.error 'fail to load events'

      loadData: (since)->
        params = {}
        since && params['since'] = since

        $http
          url: '/api/events.json'
          params: params


      initPusher: ->

        # Enable pusher logging - don't include this in production
        # TODO: remove it
        Pusher.log = -> console.info.bind( console )

        new Pusher('d52ea80b6a603fd924f8')
          .subscribe('project_event_created_53f9a11171687739dc010000')
          .bind 'new_event', (data) ->
            $scope.$apply ->
              $scope.upcoming = data.count - $scope.count


      loadUpcoming: ->
        since = $scope.events[0]?.created_at
        @loadData( since ).success (result) ->
          if result.success
            $scope.events = result.data.events.concat( $scope.events )
            $scope.count  = result.data.count
            $scope.upcoming = 0

        .error (data, result, status, config) ->
          console.error 'fail to load events'
    }


    $scope.init()
