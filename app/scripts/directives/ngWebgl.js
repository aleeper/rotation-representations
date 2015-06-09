'use strict';

angular.module('rotationAppApp')
  .directive('ngWebgl', function () {

    return {
      restrict: 'A',
      scope: {
        'width': '=',
        'height': '=',
        'fillcontainer': '=',
        'scale': '=',
        'materialType': '=',
        'quaternion': '=',
        'test': '=',
        'controlMode': '='
      },
      link: function postLink(scope, element, attrs) {

        var TAG = "ngWebgl";

        var camera, scene, renderer, clock,
          cameraControl, objectControl,
          frameA, frameB,
          shadowMesh, icosahedron, mainLight, secondLight,
          mouseX = 0, mouseY = 0,
          contW = (scope.fillcontainer) ?
            element[0].clientWidth : scope.width,
          contH = scope.height,
          windowHalfX = contW / 2,
          windowHalfY = contH / 2,
          materials = {};

        var mouseIsDown = false;

        scope.init = function () {
          console.log('ngWebgl init!');

          // Clock
          clock = new THREE.Clock(true);

          // Camera
          camera = new THREE.PerspectiveCamera(30, contW / contH, 0.1, 100 );
          camera.position.set(5, 5, 10);
          camera.lookAt(new THREE.Vector3());

          // Scene
          scene = new THREE.Scene();

          // Frames
          var positionOffset = new THREE.Vector3(0, 0, -0.01);
          frameA = createRigidBasis(1.5, 0.04);
          frameA.position.copy(positionOffset);
          scene.add(frameA);
          frameB = createRigidBasis(1.0, 0.06);
          frameB.position.copy(positionOffset);
          scene.add(frameB);

          // Lighting
          mainLight = new THREE.DirectionalLight(0xffffff);
          mainLight.position.set(1, 1, 1);
          scene.add(mainLight);

          secondLight = new THREE.DirectionalLight(0xffffff, 0.5);
          secondLight.position.set(-1, -1, -1);
          scene.add(secondLight);

          // Shadow
          var canvas = document.createElement( 'canvas' );
          canvas.width = 128;
          canvas.height = 128;

          // Render a 2d gradient to use as shadow
          var context = canvas.getContext( '2d' );
          var gradient = context.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width / 2 );

          gradient.addColorStop( 0.1, 'rgba(200,200,200,1)' );
          gradient.addColorStop( 1, 'rgba(255,255,255,1)' );

          context.fillStyle = gradient;
          context.fillRect( 0, 0, canvas.width, canvas.height );

          var shadowTexture = new THREE.Texture( canvas );
          shadowTexture.needsUpdate = true;

          var shadowMaterial = new THREE.MeshBasicMaterial( {
            map: shadowTexture
          } );
          var shadowGeo = new THREE.PlaneGeometry( 3, 3, 1, 1 );

          // Apply the shadow texture to a plane
          shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
          shadowMesh.position.y = - 1.5;
          shadowMesh.rotation.x = - Math.PI / 2;
          scene.add( shadowMesh );

          var faceIndices = [ 'a', 'b', 'c', 'd' ];

          var color, f, p, n, vertexIndex,
            radius = 1,
            geometry  = new THREE.IcosahedronGeometry( radius, 1 );


          for (var i = 0; i < geometry.faces.length; i ++) {

            f  = geometry.faces[ i ];

            n = ( f instanceof THREE.Face3 ) ? 3 : 4;

            for( var j = 0; j < n; j++ ) {

              vertexIndex = f[ faceIndices[ j ] ];

              p = geometry.vertices[ vertexIndex ];

              color = new THREE.Color( 0xffffff );
              color.setHSL( 0.125 * vertexIndex/geometry.vertices.length, 1.0, 0.5 );

              f.vertexColors[ j ] = color;

            }

          }

          materials.lambert = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading,
            vertexColors: THREE.VertexColors
          });

          materials.phong = new THREE.MeshPhongMaterial({
            ambient: 0x030303,
            color: 0xdddddd,
            specular: 0x009900,
            shininess: 30,
            shading: THREE.FlatShading,
            vertexColors: THREE.VertexColors
          });

          materials.wireframe = new THREE.MeshBasicMaterial({
            color: 0x000000,
            shading: THREE.FlatShading,
            wireframe: true,
            transparent: true });

          // Build and add the icosahedron to the scene
          icosahedron = new THREE.Mesh( geometry, materials[scope.materialType] );
          icosahedron.position.x = 0;
          icosahedron.rotation.x = 0;
          //scene.add( icosahedron );

          renderer = new THREE.WebGLRenderer( { antialias: true } );
          renderer.setClearColor( 0xffffff );
          renderer.setSize( contW, contH );

          // element is provided by the angular directive
          element[0].appendChild( renderer.domElement );

          //cameraControl = new THREE.OrbitControlsLeeper(camera, renderer.domElement);
          //cameraControl.userZoom = false;
          //cameraControl.userRotateSpeed = 1.0;
          //cameraControl.userPan = false;

          //controls = new THREE.OrbitControls(frameB, renderer.domElement);
          //controls.noZoom = true;
          //controls.noPan = true;

          //controls = new THREE.TrackballControls(frameB, renderer.domElement);
          //controls.noZoom = true;
          //controls.noPan = true;
          //controls.staticMoving = true;

          scene.add(new THREE.GridHelper(5, 1));

          objectControl = new THREE.TransformControls( camera, renderer.domElement );
          //controls.addEventListener( 'change', render );
          objectControl.attach(frameB);
          objectControl.setMode('rotate');
          scene.add(objectControl);

          renderer.domElement.addEventListener( 'mousedown', scope.onCanvasMouseDown, false);
          renderer.domElement.addEventListener( 'mouseup', scope.onCanvasMouseUp, false);

          document.addEventListener( 'mousemove', scope.onDocumentMouseMove, false );

          window.addEventListener( 'resize', scope.onWindowResize, false );

          console.log('ngWebgl done initializing!');


        };

        // -----------------------------------
        // Event listeners
        // -----------------------------------
        scope.onWindowResize = function () {

          scope.resizeCanvas();

        };

        scope.onDocumentMouseMove = function ( event ) {

          mouseX = ( event.clientX - windowHalfX );
          mouseY = ( event.clientY - windowHalfY );

        };

        scope.onCanvasMouseDown = function (event) {
          mouseIsDown = true;
        };


        scope.onCanvasMouseUp = function (event) {
          mouseIsDown = false;
        };

        // -----------------------------------
        // Updates
        // -----------------------------------
        scope.resizeCanvas = function () {

          contW = (scope.fillcontainer) ?
            element[0].clientWidth : scope.width;
          contH = scope.height;

          windowHalfX = contW / 2;
          windowHalfY = contH / 2;

          camera.aspect = contW / contH;
          camera.updateProjectionMatrix();

          renderer.setSize( contW, contH );

        };

        scope.resizeObject = function () {

          icosahedron.scale.set(scope.scale, scope.scale, scope.scale);
          shadowMesh.scale.set(scope.scale, scope.scale, scope.scale);

        };

        scope.changeMaterial = function () {

          icosahedron.material = materials[scope.materialType];

        };

        scope.updateQuaternion = function () {
          var q = scope.quaternion;
          var aQb = new THREE.Quaternion(q.x, q.y, q.z, q.w);
          if ("debug" in GLOBAL.queryParams) {
            console.log(TAG + ": Received new quaternion: " + makeStringQuaternion(aQb));
          }
          frameB.setRotationFromQuaternion(q);
        };

        scope.updateControlMode = function () {
          objectControl.setSpace(scope.controlMode === 'world' ? 'world' : 'local' );
        }


        // -----------------------------------
        // Draw and Animate
        // -----------------------------------
        scope.animate = function () {

          requestAnimationFrame( scope.animate );

          //cameraControl.update();

          if (mouseIsDown) {
            //controls.update();
            var q = frameB.quaternion;
            scope.quaternion = {x: q.x, y: q.y, z: q.z, w: q.w};
            scope.test = clock.getElapsedTime();
            scope.$apply();
          }

          scope.render();
        };

        scope.render = function () {

          renderer.render( scene, camera );

        };

        // -----------------------------------
        // Watches
        // -----------------------------------
        scope.$watch('fillcontainer + width + height', function () {

          scope.resizeCanvas();

        });

        scope.$watch('scale', function () {

          scope.resizeObject();

        });

        scope.$watch('materialType', function () {

          scope.changeMaterial();

        });

        scope.$watch('quaternion', function () {

          scope.updateQuaternion();
        });

        scope.$watch('controlMode', function () {

          scope.updateControlMode();
        });

        // Begin
        scope.init();
        scope.animate();

      }
    };
  });
