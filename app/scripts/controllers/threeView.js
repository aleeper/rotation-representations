'use strict';

angular.module('rotationAppApp')
  .controller('ThreeViewCtrl', ['$scope', function ($scope) {

    $scope.canvasWidth = 400;
    $scope.canvasHeight = 400;
    $scope.dofillcontainer = true;
    $scope.scale = 1;
    $scope.materialType = 'lambert';
    $scope.quaternion = {x: 0, y: 0, z: 0, w: 1};

  }]);
