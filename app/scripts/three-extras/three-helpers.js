'use strict';

var createRigidBasis = function (scale) {
  scale = scale || 1.0;

  var frame = new THREE.Object3D();

  var rodGeometry   = new THREE.CylinderGeometry(0.1, 0.10, 0.8, 12, 2);
  var coneGeometry  = new THREE.CylinderGeometry(0.0, 0.15, 0.2, 12, 2);
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

  frame.scale.set(scale, scale, scale);
  return frame;
};
