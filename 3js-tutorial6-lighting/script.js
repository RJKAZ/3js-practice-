// When testing this, make sure to run with Live server otherwise it won't work

var scene = new THREE.Scene( );
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer( );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', function()
{
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
});

controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create the shape
var geometry = new THREE.BoxGeometry(1, 1, 1);
var cubeMaterials =
[
new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('num1.jpg'), side: THREE.DoubleSide}),
new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('num3.jpg'), side: THREE.DoubleSide}),
new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('num5.jpg'), side: THREE.DoubleSide}),
new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('num6.jpg'), side: THREE.DoubleSide}),
new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('num4.jpg'), side: THREE.DoubleSide}),
new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('num2.jpg'), side: THREE.DoubleSide}),
];




// create a material color or image texture

var material = new THREE.MeshFaceMaterial(cubeMaterials); 
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 10;



//floor 
var floorGeometry = new THREE.CubeGeometry(10, 1, 10);
var floorMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('floor.jpg'), side: THREE.DoubleSide});
var floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
floorCube.position.y = -5;
scene.add(floorCube);

// ceiling 
var ceilingGeometry = new THREE.CubeGeometry(10, 1, 10);
var ceilingMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('ceiling.jpg'), side: THREE.DoubleSide});
var ceilingCube = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceilingCube.position.y = 5;
scene.add(ceilingCube);

// Left Wall
var leftWallGeometry = new THREE.CubeGeometry(1, 10, 10);
var leftWallMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('wall.jpeg'), side: THREE.DoubleSide});
var leftWallCube = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
leftWallCube.position.x = -5;
scene.add(leftWallCube);

// Right Wall
var rightWallGeometry = new THREE.CubeGeometry(1, 10, 10);
var rightWallMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('wall.jpeg'), side: THREE.DoubleSide});
var rightWallCube = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
rightWallCube.position.x = 5;
scene.add(rightWallCube);

var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.0);  // the first parametere is the color of the lighting, and the second parameter is the intesity of the lighting.
//scene.add(ambientLight);

// as is the lighting won't be viewable becasue we are using MeshBasic for the material. MeshBasic doesn't require lighting and won't show it. To show lighting you need to change the material from MeshBasic to either MeshLAmbert or MeshPhong

var light1 = new THREE.PointLight(0xFF0040, 2, 50);
scene.add(light1);
 
var light2 = new THREE.PointLight(0x0040FF, 2, 50);
scene.add(light2);

var light3 = new THREE.PointLight(0x80FF80, 2, 50);
scene.add(light3);

var directionalLight = new THREE.DirectionalLight(0xFFFFFF,1);
directionalLight.position.set(0,1,0);
scene.add(directionalLight);

var spotLight = new THREE.SpotLight(0xFF45F6, 25);
spotLight.position.set(0,3,0);
scene.add(spotLight);




var update = function( )
{
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;

    var time = Date.now() * 0.0005;
    light1.position.x = Math.sin( time * 0.7) * 30;
    light1.position.y = Math.cos( time * 0.5) * 40;
    light1.position.z = Math.cos( time * 0.3) * 30;

    var time = Date.now() * 0.0005;
    light2.position.x = Math.cos( time * 0.3) * 30;
    light2.position.y = Math.sin( time * 0.5) * 40;
    light2.position.z = Math.sin( time * 0.7) * 30;

    var time = Date.now() * 0.0005;
    light3.position.x = Math.sin( time * 0.7) * 30;
    light3.position.y = Math.cos( time * 0.3) * 40;
    light3.position.z = Math.sin( time * 0.5) * 30;

};

var render = function( )
{
    renderer.render( scene, camera );
};

var GameLoop = function( )
{
    requestAnimationFrame( GameLoop );

    update( );
    render( );
};

GameLoop( );