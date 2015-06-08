'use strict';

angular.module('rotationAppApp')
  .controller('ThreeViewCtrl', ['$scope', function ($scope) {

    $scope.canvasWidth = 400;
    $scope.canvasHeight = 400;
    $scope.dofillcontainer = true;
    $scope.scale = 1;
    $scope.materialType = 'lambert';
    $scope.ctrlQuaternion = {x: 0, y: 0, z: 0, w: 1};
    //$scope.ctrlQuaternion.data = {x: 0, y: 0, z: 0, w: 1};

    $scope.test = 27;

    var count = 0;

    var updateQuaternion = function(newValue, oldValue) {
      if(newValue === oldValue)
        return;

      console.log('updateQuaternion in ThreeViewCtrl');
      $scope.stopWatchingCtrl();
      $scope.ctrlQuaternion = {w: newValue.w, x: newValue.x, y: newValue.y, z: newValue.z};
      $scope.startWatchingCtrl();
    };

    var setMasterParams = function() {

      // TODO figure out how to enable debug mode based on URL string.
      //console.log('setMasterParams from three-view ' + count);
      //++count;

      // Do the update.
      $scope.stopWatchingMaster();
      $scope.$parent.$parent.setMasterParams($scope.ctrlQuaternion);
      $scope.startWatchingMaster();
    };

    $scope.startWatchingMaster = function() {
      $scope.stopWatchingMaster = $scope.$watch('masterParams', updateQuaternion, true);
    };


    $scope.startWatchingCtrl = function() {
      $scope.stopWatchingCtrl = $scope.$watch('ctrlQuaternion', setMasterParams, true);
    };



    $scope.startWatchingMaster();
    $scope.startWatchingCtrl();

    //$scope.$watch('ctrlQuaternion', setMasterParams, true);


  }]);
