

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

var loader = new THREE.ObjectLoader();
loader.load ('models/iron_hoe.json', function(object){
        scene.add(object);
    }
);

camera.position.z = 3;


//var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.0);  // the first parametere is the color of the lighting, and the second parameter is the intesity of the lighting.
//scene.add(ambientLight);


var update = function( )
{
    

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