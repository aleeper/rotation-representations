'use strict';

var GLOBAL = {};

angular.module('rotationAppApp')
  .controller('MainCtrl', function ($scope) {
    var self = $scope;

    $scope.masterParams = null;

    $scope.setMasterParams = function (q) {
      $scope.masterParams = {x: q.x, y: q.y, z: q.z, w: q.w};
    };

    $scope.resetMasterParamsToIdentity = function () {
      console.log('Resetting to identity!');
      $scope.setMasterParams({w: 1, x: 0, y: 0, z: 0});
    };

    $scope.resetMasterParamsToIdentity();
  });
