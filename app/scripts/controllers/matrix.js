'use strict';

angular.module('rotationAppApp')
  .controller('MatrixCtrl', function ($scope) {

    var updateMatrix = function(newValue, oldValue) {
      if (newValue === oldValue)
        return;

      console.log('updateMatrix');
      var q = new THREE.Quaternion(newValue.x, newValue.y, newValue.z, newValue.w);
      var m = new THREE.Matrix4();
      m.makeRotationFromQuaternion(q);
      // Note three.js matrices store elements in column-major order.
      $scope.matrix = {
          xx: m.elements[0], xy: m.elements[4], xz: m.elements[8],
          yx: m.elements[1], yy: m.elements[5], yz: m.elements[9],
          zx: m.elements[2], zy: m.elements[6], zz: m.elements[10]};
    };

    $scope.setMasterParams = function() {
      console.log('setMasterParams from matrix');

      // Do the math
      var matrix = $scope.matrix;
      // Oddly enough, the three.js matrix constructor is row-major.
      var m = new THREE.Matrix4();
      m.set(matrix.xx, matrix.xy, matrix.xz, 0,
            matrix.yx, matrix.yy, matrix.yz, 0,
            matrix.zx, matrix.zy, matrix.zz, 0,
            0,         0,         0,         1);

      var q = new THREE.Quaternion();
      q.setFromRotationMatrix(m);
      q.normalize();

      // Set matrix from this normalized quaternion.
      updateMatrix(q);

      // Do the update.
      $scope.stopWatching();
      $scope.$parent.$parent.setMasterParams({w: q.w, x: q.x, y: q.y, z: q.z});
      $scope.startWatching();
    };

    $scope.startWatching = function() {
      $scope.stopWatching = $scope.$watch('masterParams', updateMatrix , true);
    };

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

    // Initialize this representation.
    updateMatrix($scope.$parent.$parent.masterParams);

    // Start watching the masterParams
    $scope.startWatching();

  });
