'use strict';

var createRigidBasis = function (arrowLength, arrowDiameter) {
  arrowLength = arrowLength || 1.0;
  arrowDiameter = arrowDiameter || 0.08;

  var frame = new THREE.Object3D();
  frame.scale.set(arrowLength, arrowLength, arrowLength);
  var diameter = arrowDiameter / arrowLength;

  var rodGeometry   = new THREE.CylinderGeometry(diameter, diameter, 0.8, 12, 2);
  var coneGeometry  = new THREE.CylinderGeometry(0,  1.5 * diameter, 0.2, 12, 2);
  var redMaterial   = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
  var greenMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
  var blueMaterial  = new THREE.MeshLambertMaterial( { color: 0x0000ff } );

  var shaft, tip;
  var rodPosition = 0.4;
  var conePosition = 0.9;

  // X-axis
  shaft = new THREE.Mesh( rodGeometry, redMaterial );
  shaft.position.x = rodPosition;
  shaft.rotation.z = - Math.PI / 2;
  shaft.castShadow = shaft.receiveShadow = true;
  frame.add( shaft );

  tip = new THREE.Mesh( coneGeometry, redMaterial );
  tip.position.x = conePosition;
  tip.rotation.z = - Math.PI / 2;
  tip.castShadow = tip.receiveShadow = true;
  frame.add( tip );

  // Y-axis
  shaft = new THREE.Mesh( rodGeometry, greenMaterial );
  shaft.position.y = rodPosition;
  shaft.castShadow = shaft.receiveShadow = true;
  frame.add( shaft );

  tip = new THREE.Mesh( coneGeometry, greenMaterial );
  tip.position.y = conePosition;
  tip.castShadow = tip.receiveShadow = true;
  frame.add( tip );

  // Z-axis
  shaft = new THREE.Mesh( rodGeometry, blueMaterial );
  shaft.position.z = rodPosition;
  shaft.rotation.x = Math.PI / 2;
  shaft.castShadow = shaft.receiveShadow = true;
  frame.add( shaft );

  tip = new THREE.Mesh( coneGeometry, blueMaterial );
  tip.position.z = conePosition;
  tip.rotation.x = Math.PI / 2;
  tip.castShadow = tip.receiveShadow = true;
  frame.add( tip );

  return frame;
};

var makeStringQuaternion = function (q) {
  return "{x: " + q.x + ", y: " + q.y + ", z: " + q.z + ", w: " + q.w + "}";
};

function getQueryParams(qs) {
  qs = qs.split('+').join(' ');

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

GLOBAL.queryParams = getQueryParams(document.location.search);
