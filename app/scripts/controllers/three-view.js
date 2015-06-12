'use strict';

angular.module('rotationAppApp')
  .controller('ThreeViewCtrl', ['$scope', function ($scope) {

    var TAG = 'ThreeViewCtrl';
    var CONTROL_LOCAL = 'local';
    var CONTROL_WORLD = 'world';

    $scope.canvasWidth = 400;
    $scope.canvasHeight = 400;
    $scope.dofillcontainer = true;
    $scope.scale = 1;
    $scope.materialType = 'lambert';
    $scope.ctrlQuaternion = {x: 0, y: 0, z: 0, w: 1};
    $scope.controlMode = CONTROL_LOCAL;
    $scope.controlModeLabel = 'B';
    $scope.test = 27;

    var count = 0;

    var updateQuaternion = function(newValue, oldValue) {
      if(newValue === oldValue)
        return;

      if ("debug" in GLOBAL.queryParams) {
        console.log(TAG + ': updateQuaternion');
      }

      $scope.stopWatchingCtrl();
      $scope.ctrlQuaternion = {w: newValue.w, x: newValue.x, y: newValue.y, z: newValue.z};
      $scope.startWatchingCtrl();
    };

    var setMasterParams = function() {

      if ("debug" in GLOBAL.queryParams) {
        console.log(TAG + ': setMasterParams ' + makeStringQuaternion($scope.ctrlQuaternion));
      }
      ++count;

      // Do the update.
      $scope.stopWatchingMaster();
      $scope.$parent.$parent.setMasterParams($scope.ctrlQuaternion);
      $scope.startWatchingMaster();
    };

    $scope.toggleControlMode = function () {
      var newValue = ($scope.controlMode === CONTROL_WORLD) ? CONTROL_LOCAL : CONTROL_WORLD;
      console.log(TAG + ': toggle control mode, setting to ' + newValue);
      $scope.controlModeLabel = newValue === CONTROL_WORLD ? 'A' : 'B';
      $scope.controlMode = newValue;
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
