var scene, camera, renderer, mesh;
var meshFloor;

var keyboard = {};
var player = { height: 1.8};

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);

  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff4444, wireframe: true})
  );

  scene.add(mesh);

  meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(10,10, 10,10),
    new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
  );
  meshFloor.rotation.x -= Math.PI / 2;
  scene.add(meshFloor);


  camera.position.set(0, player.height,-5);
  camera.lookAt(new THREE.Vector3(0,player.height,0));

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(1280, 720);
  document.body.appendChild(renderer.domElement);

  animate();

}

function animate(){
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  if(keyboard[87]){// W key
    camera.position.x += Math.sin(camera.rotation.y) * player.speed;
    camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }

  if(keyboard[83]){// S key
    camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
    camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }

  if (keyboard[37]){ // left arrow key
    camera.rotation.y += Math.PI * 0.01;
  }
  if (keyboard[39]){ // right arrow key
    camera.rotation.y -= Math.PI * 0.01;

  }

  renderer.render(scene, camera);
}


function keyDown(event){
  keyboard[event.keyCode] = true;
  
}

function keyUp(event){
  keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);


window.onload = init; 


// https://www.youtube.com/watch?v=UUilwGxIj_Q