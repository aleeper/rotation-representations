'use strict';

angular.module('rotationAppApp')
  .controller('QuaternionCtrl', function ($scope, $timeout) {

    var updateQuaternion = function(newValue, oldValue) {
      if(newValue === oldValue)
        return;

      console.log('updateQuaternion');
      $scope.quaternion = {w: newValue.w, x: newValue.x, y: newValue.y, z: newValue.z};
    };

    $scope.setMasterParams = function() {
      console.log('setMasterParams from quaternion');

      // Do the math.
      var q = $scope.quaternion;

      // Do the update.
      $scope.stopWatching();
      $scope.$parent.masterParams = {w: q.w, x: q.x, y: q.y, z: q.z};
      $scope.startWatching();
    };

    $scope.startWatching = function() {
      $scope.stopWatching = $scope.$watch('masterParams', updateQuaternion , true);
    };

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

    // Initialize this representation.
    updateQuaternion($scope.$parent.masterParams);

    // Start watching the masterParams
    $scope.startWatching();

  });
