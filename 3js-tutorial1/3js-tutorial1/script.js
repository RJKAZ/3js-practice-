// first we create the scene, this is what we are viewing. What we have objects in, what the user interacts with, etc

var scene = new THREE.Scene( );

// then we need the camera. its a virtual camera, its what the user will see the world through. There are two kinds, Perspective and Autographic. Perspective will literally give you perspective
// However Autographic could be useful for certain use cases like 2D games or archetecture. 
// perspective has a few parameters, first is field of view, a ratio of the brower, and the near clipping plane, and then the file clipping plane. 

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// now we set up a file renderer

var renderer = new THREE.WebGLRenderer( );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// now we set up an update method
// Game logic
var update = function( )
{

};

// draw Scene

var render = function( )
{
    renderer.render( scene, camera );
};
// run game loop (update, render, repeat)
var GameLoop = function( )
{
    requestAnimationFrame( GameLoop );

    update( );
    render( );
};

GameLoop( );