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
      var raw = $scope.quaternion;

      var q_norm = new THREE.Quaternion(raw.x, raw.y, raw.z, raw.w);
      console.log('quaternion magnitude = ' + q_norm.length());
      q_norm.normalize();

      // Apply the normalized values to the view.
      updateQuaternion(q_norm);

      // Do the update.
      $scope.stopWatching();
      $scope.$parent.$parent.setMasterParams({w: q_norm.w, x: q_norm.x, y: q_norm.y, z: q_norm.z});
      $scope.startWatching();
    };

    $scope.startWatching = function() {
      $scope.stopWatching = $scope.$watch('masterParams', updateQuaternion , true);
    };

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

    // Initialize this representation.
    updateQuaternion($scope.$parent.$parent.masterParams);

    // Start watching the masterParams
    $scope.startWatching();

  });
