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
new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('num1.jpg'), side: THREE.DoubleSide}),
new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('num3.jpg'), side: THREE.DoubleSide}),
new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('num5.jpg'), side: THREE.DoubleSide}),
new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide}),
new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('num4.jpg'), side: THREE.DoubleSide}),
new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('num2.jpg'), side: THREE.DoubleSide}),
];




// create a material color or image texture

var material = new THREE.MeshFaceMaterial(cubeMaterials); 
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;



var update = function( )
{
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;

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