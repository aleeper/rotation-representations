"use strict";angular.module("rotationAppApp",[]),angular.module("rotationAppApp").controller("MainCtrl",["$scope",function(a){a.masterParams=null,a.setMasterParams=function(b){a.masterParams={x:b.x,y:b.y,z:b.z,w:b.w}},a.resetMasterParamsToIdentity=function(){console.log("Resetting to identity!"),a.setMasterParams({w:1,x:0,y:0,z:0})},a.resetMasterParamsToIdentity()}]),angular.module("rotationAppApp").controller("MatrixCtrl",["$scope",function(a){var b=function(b,c){if(b!==c){console.log("updateMatrix");var d=new THREE.Quaternion(b.x,b.y,b.z,b.w),e=new THREE.Matrix4;e.makeRotationFromQuaternion(d),a.matrix={xx:e.elements[0],xy:e.elements[4],xz:e.elements[8],yx:e.elements[1],yy:e.elements[5],yz:e.elements[9],zx:e.elements[2],zy:e.elements[6],zz:e.elements[10]}}};a.setMasterParams=function(){console.log("setMasterParams from matrix");var c=a.matrix,d=new THREE.Matrix4;d.set(c.xx,c.xy,c.xz,0,c.yx,c.yy,c.yz,0,c.zx,c.zy,c.zz,0,0,0,0,1);var e=new THREE.Quaternion;e.setFromRotationMatrix(d),e.normalize(),b(e),a.stopWatching(),a.$parent.$parent.setMasterParams({w:e.w,x:e.x,y:e.y,z:e.z}),a.startWatching()},a.startWatching=function(){a.stopWatching=a.$watch("masterParams",b,!0)},b(a.$parent.$parent.masterParams),a.startWatching()}]),angular.module("rotationAppApp").controller("QuaternionCtrl",["$scope","$timeout",function(a,b){var c=function(b,c){b!==c&&(console.log("updateQuaternion"),a.quaternion={w:b.w,x:b.x,y:b.y,z:b.z})};a.setMasterParams=function(){console.log("setMasterParams from quaternion");var b=a.quaternion,d=new THREE.Quaternion(b.x,b.y,b.z,b.w);console.log("quaternion magnitude = "+d.length()),d.normalize(),c(d),a.stopWatching(),a.$parent.$parent.setMasterParams({w:d.w,x:d.x,y:d.y,z:d.z}),a.startWatching()},a.startWatching=function(){a.stopWatching=a.$watch("masterParams",c,!0)},c(a.$parent.$parent.masterParams),a.startWatching()}]),angular.module("rotationAppApp").controller("AngleAxisCtrl",["$scope",function(a){var b=function(b,c){if(b!==c){console.log("updateAngleAxis");var d=new THREE.Quaternion(b.x,b.y,b.z,b.w),e=new THREE.Vector4;e.setAxisAngleFromQuaternion(d),a.angle=180*e.w/Math.PI,a.axis={x:e.x,y:e.y,z:e.z}}};a.setMasterParams=function(){console.log("setMasterParams from angle-axis");var c=a.angle*Math.PI/180,d=a.axis,e=new THREE.Vector3(d.x,d.y,d.z);e.normalize();var f=new THREE.Quaternion;f.setFromAxisAngle(e,c),b(f),a.stopWatching(),a.$parent.$parent.setMasterParams({w:f.w,x:f.x,y:f.y,z:f.z}),a.startWatching()},a.startWatching=function(){a.stopWatching=a.$watch("masterParams",b,!0)},b(a.$parent.$parent.masterParams),a.startWatching()}]),angular.module("rotationAppApp").controller("ThreeViewCtrl",["$scope",function(a){a.canvasWidth=400,a.canvasHeight=400,a.dofillcontainer=!0,a.scale=1,a.materialType="lambert",a.quaternion={x:0,y:0,z:0,w:1};var b=function(b,c){b!==c&&(console.log("updateQuaternion in ThreeViewCtrl"),a.quaternion={w:b.w,x:b.x,y:b.y,z:b.z})};a.$watch("masterParams",b,!0)}]),angular.module("rotationAppApp").directive("ngWebgl",function(){return{restrict:"A",scope:{width:"=",height:"=",fillcontainer:"=",scale:"=",materialType:"=",quaternion:"="},link:function(a,b,c){var d,e,f,g,h,i,j,k,l=0,m=0,n=a.fillcontainer?b[0].clientWidth:a.width,o=a.height,p=n/2,q=o/2,r={};a.init=function(){console.log("ngWebgl init!"),d=new THREE.PerspectiveCamera(30,n/o,.1,100),d.position.z=10,e=new THREE.Scene,g=new createRigidBasis(1),e.add(g),h=new createRigidBasis(1),e.add(h),k=new THREE.DirectionalLight(16777215),k.position.set(1,1,1),e.add(k);var c=document.createElement("canvas");c.width=128,c.height=128;var l=c.getContext("2d"),m=l.createRadialGradient(c.width/2,c.height/2,0,c.width/2,c.height/2,c.width/2);m.addColorStop(.1,"rgba(200,200,200,1)"),m.addColorStop(1,"rgba(255,255,255,1)"),l.fillStyle=m,l.fillRect(0,0,c.width,c.height);var p=new THREE.Texture(c);p.needsUpdate=!0;var q=new THREE.MeshBasicMaterial({map:p}),s=new THREE.PlaneGeometry(3,3,1,1);i=new THREE.Mesh(s,q),i.position.y=-1.5,i.rotation.x=-Math.PI/2,e.add(i);for(var t,u,v,w,x,y=["a","b","c","d"],z=1,A=new THREE.IcosahedronGeometry(z,1),B=0;B<A.faces.length;B++){u=A.faces[B],w=u instanceof THREE.Face3?3:4;for(var C=0;w>C;C++)x=u[y[C]],v=A.vertices[x],t=new THREE.Color(16777215),t.setHSL(.125*x/A.vertices.length,1,.5),u.vertexColors[C]=t}r.lambert=new THREE.MeshLambertMaterial({color:16777215,shading:THREE.FlatShading,vertexColors:THREE.VertexColors}),r.phong=new THREE.MeshPhongMaterial({ambient:197379,color:14540253,specular:39168,shininess:30,shading:THREE.FlatShading,vertexColors:THREE.VertexColors}),r.wireframe=new THREE.MeshBasicMaterial({color:0,shading:THREE.FlatShading,wireframe:!0,transparent:!0}),j=new THREE.Mesh(A,r[a.materialType]),j.position.x=0,j.rotation.x=0,f=new THREE.WebGLRenderer({antialias:!0}),f.setClearColor(16777215),f.setSize(n,o),b[0].appendChild(f.domElement),document.addEventListener("mousemove",a.onDocumentMouseMove,!1),window.addEventListener("resize",a.onWindowResize,!1),console.log("ngWebgl done initializing!")},a.onWindowResize=function(){a.resizeCanvas()},a.onDocumentMouseMove=function(a){l=a.clientX-p,m=a.clientY-q},a.resizeCanvas=function(){n=a.fillcontainer?b[0].clientWidth:a.width,o=a.height,p=n/2,q=o/2,d.aspect=n/o,d.updateProjectionMatrix(),f.setSize(n,o)},a.resizeObject=function(){j.scale.set(a.scale,a.scale,a.scale),i.scale.set(a.scale,a.scale,a.scale)},a.changeMaterial=function(){j.material=r[a.materialType]},a.updateQuaternion=function(){var b=a.quaternion;h.quaternion.set(b.x,b.y,b.z,b.w)},a.animate=function(){requestAnimationFrame(a.animate),a.render()},a.render=function(){d.position.x+=.05*(.01*l-d.position.x),d.lookAt(e.position),f.render(e,d)},a.$watch("fillcontainer + width + height",function(){a.resizeCanvas()}),a.$watch("scale",function(){a.resizeObject()}),a.$watch("materialType",function(){a.changeMaterial()}),a.$watch("quaternion",function(){a.updateQuaternion()}),a.init(),a.animate()}}});var createRigidBasis=function(a){a=a||1;var b,c,d=new THREE.Object3D,e=new THREE.CylinderGeometry(.1,.1,.8,12,2),f=new THREE.CylinderGeometry(0,.15,.2,12,2),g=new THREE.MeshLambertMaterial({color:16711680}),h=new THREE.MeshLambertMaterial({color:65280}),i=new THREE.MeshLambertMaterial({color:255}),j=.4,k=.9;return b=new THREE.Mesh(e,g),b.position.x=j,b.rotation.z=-Math.PI/2,b.castShadow=b.receiveShadow=!0,d.add(b),c=new THREE.Mesh(f,g),c.position.x=k,c.rotation.z=-Math.PI/2,c.castShadow=c.receiveShadow=!0,d.add(c),b=new THREE.Mesh(e,h),b.position.y=j,b.castShadow=b.receiveShadow=!0,d.add(b),c=new THREE.Mesh(f,h),c.position.y=k,c.castShadow=c.receiveShadow=!0,d.add(c),b=new THREE.Mesh(e,i),b.position.z=j,b.rotation.x=Math.PI/2,b.castShadow=b.receiveShadow=!0,d.add(b),c=new THREE.Mesh(f,i),c.position.z=k,c.rotation.x=Math.PI/2,c.castShadow=c.receiveShadow=!0,d.add(c),d.scale.set(a,a,a),d};