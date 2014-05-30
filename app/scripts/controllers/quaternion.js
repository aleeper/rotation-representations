'use strict';

angular.module('rotationAppApp')
  .controller('QuaternionCtrl', function ($scope) {
    $scope.quaternion = $scope.$parent.masterParams;

    var updateQuaternion = function(value) {
      $scope.quaternion = value;
    };

    // Set up a watcher so that the data will update when the master params change.
    $scope.$watch('masterParams', updateQuaternion , true);

  });
