'use strict';

angular.module('rotationAppApp')
  .controller('AngleAxisCtrl', function ($scope) {

    var updateAngleAxis = function(newValue, oldValue) {
      if(newValue === oldValue)
        return;

      console.log('updateAngleAxis');
      var q = new THREE.Quaternion(newValue.x, newValue.y, newValue.z, newValue.w);
      var aa = new THREE.Vector4();
      aa.setAxisAngleFromQuaternion(q);
      $scope.angle = aa.w;
      $scope.axis = {x: aa.x, y: aa.y, z: aa.z};
    };

    $scope.setMasterParams = function() {
      console.log('setMasterParams from angle-axis');

      // Do the math.
      var q = new THREE.Quaternion();
      var axis = $scope.axis;
      q.setFromAxisAngle(new THREE.Vector3(axis.x, axis.y, axis.z), $scope.angle);

      // Do the update.
      $scope.stopWatching();
      $scope.$parent.masterParams = {w: q.w, x: q.x, y: q.y, z: q.z};
      $scope.startWatching();
    };

    $scope.startWatching = function() {
      $scope.stopWatching = $scope.$watch('masterParams', updateAngleAxis , true);
    };

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

    // Initialize this representation.
    updateAngleAxis($scope.$parent.masterParams);

    // Start watching the masterParams
    $scope.startWatching();

  });
