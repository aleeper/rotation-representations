'use strict';

angular.module('rotationAppApp')
  .controller('QuaternionCtrl', function ($scope) {
    $scope.quaternion = $scope.$parent.masterParams
  });
