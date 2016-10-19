angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function() {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  })

  .controller('DayOfWeekController', function($scope, $stateParams, $ionicPopup) {
    $scope.title = $stateParams["id"];
    if ($scope.title == 'Dzisiaj') {
      var currrent_date = new Date;
      var days_of_week = {
        1: 'Poniedziałek',
        2: 'Wtorek',
        3: 'Środa',
        4: 'Czwartek',
        5: 'Piątek',
        6: 'Sobota',
        0: 'Niedziela'
      }
      $scope.title = days_of_week[currrent_date.getDay()];
    }
    
    $scope.shopping_list = JSON.parse(window.localStorage.getItem($scope.title));
    if (!$scope.shopping_list) {
      $scope.shopping_list = [];
    } 
    $scope.new_item = {};
    
    $scope.add = function (item) {
      if (!item.label || !item.quantity) {
        return; 
      }
      $scope.shopping_list.push(item);
      $scope.new_item = {};
      window.plugins.toast.showLongBottom('Element dodany!')
    }

    $scope.showConfirm = function(index) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Usuń',
        template: 'Czy na pewno chcesz usunąć ten element?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          $scope.shopping_list.pop(index);
        }
      });
    };
    
    $scope.save = function() {
      window.localStorage.setItem($scope.title, JSON.stringify($scope.shopping_list));
      window.plugins.toast.showLongBottom('Zapisano!')
    }
    /*$scope.$watchCollection($scope.shopping_list, function() {
      $scope.save();
    })*/
  })
  .controller('AuthorController', function() {
  
  });
