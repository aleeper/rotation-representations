'use strict';

angular.module('rotationAppApp')
  .controller('ThreeViewCtrl', ['$scope', function ($scope) {

    $scope.canvasWidth = 400;
    $scope.canvasHeight = 400;
    $scope.dofillcontainer = true;
    $scope.scale = 1;
    $scope.materialType = 'lambert';
    $scope.quaternion = {x: 0, y: 0, z: 0, w: 1};

    var updateQuaternion = function(newValue, oldValue) {
      if(newValue === oldValue)
        return;

      console.log('updateQuaternion in ThreeViewCtrl');
      $scope.quaternion = {w: newValue.w, x: newValue.x, y: newValue.y, z: newValue.z};
    };

    $scope.$watch('masterParams', updateQuaternion , true);

  }]);
