
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
var loader = new THREE.FontLoader();

var geometry = new THREE.CircleGeometry( 1, 5 );
var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } );
var circle = new THREE.Mesh( geometry, material );
scene.add( circle );

camera.position.z = 20;

// lets add another shape

var geometry1 = new THREE.BoxGeometry(10, 10, 10);
var material1 = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true}); 
var cube = new THREE.Mesh(geometry1, material1);
scene.add(cube);

var geometry2 = new THREE.ConeGeometry( 5, 20, 32 );
var material2 = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true} );
var cone = new THREE.Mesh( geometry2, material2 );
scene.add( cone );

var geometry3 = new THREE.CylinderGeometry( 5, 5, 20, 32 );
var material3 = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true});
var cylinder = new THREE.Mesh( geometry3, material3 );
scene.add( cylinder );



var update = function( )
{
    circle.rotation.x += 0.08;
    circle.rotation.y += 0.012;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
    cone.rotation.x += 0.01;
    cone.rotation.y += 0.005;
    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.005;
    

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