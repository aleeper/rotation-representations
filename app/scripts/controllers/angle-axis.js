'use strict';

angular.module('rotationAppApp')
  .controller('AngleAxisCtrl', function ($scope) {

    var updateAngleAxis = function(newValue, oldValue) {
      if(newValue === oldValue)
        return;

      if ("debug" in GLOBAL.queryParams) {
        console.log('updateAngleAxis');
      }

      var q = new THREE.Quaternion(newValue.x, newValue.y, newValue.z, newValue.w);
      var aa = new THREE.Vector4();
      aa.setAxisAngleFromQuaternion(q);
      $scope.angle = aa.w * 180/ Math.PI;
      $scope.axis = {x: aa.x, y: aa.y, z: aa.z};
    };

    $scope.setMasterParams = function() {
      console.log('setMasterParams from angle-axis');

      // Do the math.
      var angle_rad = $scope.angle * Math.PI / 180;
      var axis_raw = $scope.axis;
      var axis_norm = new THREE.Vector3(axis_raw.x, axis_raw.y, axis_raw.z);
      axis_norm.normalize();
      var q = new THREE.Quaternion();
      q.setFromAxisAngle(axis_norm, angle_rad);

      // Apply the normalized values to the text field.
      updateAngleAxis(q);

      // Do the update.
      $scope.stopWatching();
      $scope.$parent.$parent.setMasterParams({w: q.w, x: q.x, y: q.y, z: q.z});
      $scope.startWatching();
    };

    $scope.startWatching = function() {
      $scope.stopWatching = $scope.$watch('masterParams', updateAngleAxis , true);
    };

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

    // Initialize this representation.
    updateAngleAxis($scope.$parent.$parent.masterParams);

    // Start watching the masterParams
    $scope.startWatching();

  });
