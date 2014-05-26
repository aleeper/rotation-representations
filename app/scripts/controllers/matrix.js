'use strict';

angular.module('rotationAppApp')
  .controller('MatrixCtrl', function ($scope) {
    $scope.matrix = {}

    $scope.$watch('masterParams', function(value) {
      var q, m;

      console.log('watched');

      q = new THREE.Quaternion(value.x, value.y, value.z, value.w);
      m = new THREE.Matrix4();

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
    }, true);

  });
