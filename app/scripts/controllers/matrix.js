'use strict';

angular.module('rotationAppApp')
  .controller('MatrixCtrl', function ($scope) {
    $scope.matrix = {};

    var updateMatrix = function(value) {
      console.log('watched');
      var q = new THREE.Quaternion(value.x, value.y, value.z, value.w);
      var m = new THREE.Matrix4();

      m.makeRotationFromQuaternion(q);
      $scope.matrix = {
          xx: m.elements[0],
          xy: m.elements[4],
          xz: m.elements[8],
          yx: m.elements[1],
          yy: m.elements[5],
          yz: m.elements[9],
          zx: m.elements[2],
          zy: m.elements[6],
          zz: m.elements[10]
      };
    };

    $scope.setFromMatrix = function() {
      console.log('setFromMatrix');
      var matrix = $scope.matrix;
      var m = new THREE.Matrix4(matrix.xx, matrix.xy, matrix.xz, 0,
                                matrix.yx, matrix.yy, matrix.yz, 0,
                                matrix.zx, matrix.zy, matrix.zz, 0,
                                        0,         0,         0, 1);

      var q = new THREE.Quaternion();
      q.setFromRotationMatrix(m);
      $scope.$parent.masterParams = {w: q.w, x: q.x, y: q.y, z: q.z};
    };

    // Set up a watcher so that the matrix will update when the master params change.
    $scope.$watch('masterParams', updateMatrix , true);

  });
