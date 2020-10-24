
var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var crate, crateTexture, crateNormalMap, crateBumpMap; 

var keyboard = {};
var player = { height: 1.8, speed: 0.2, turnSpeed:Math.PI*0.02};;
var USE_WIREFRAME = false;

// an object needed to hold all the things needed for our loading screeen
var loadingScreen = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
  box: new THREE.Mesh(
    new THREE.BoxGeometry(0.5,0.5,0.5),
    new THREE.MeshBasicMaterial({color: 0x4444ff})
  )
};

var loadingManager = null;
var RESOURCES_LOADED = false;

// Models Index

var models = {
  tent: {
    obj: "models/Tent_Poles_01.obj",
    mtl: "models/Tent_Poles_01.mtl",
    mesh: null
  },
  campfire: {
    obj: "models/Campfire_01.obj",
    mtl: "models/Campfire_01.mtl",
    mesh: null
  },
  pirateship: {
    obj: "models/Pirateship_01.obj",
    mtl: "models/Pirateship_01.mtl",
    mesh: null
  }
};

// Meshes index

var meshes = {};

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);

  // set up the loading screen's scene, it can be treated like our main scene

  loadingScreen.box.position.set(0,0,5);
  loadingScreen.camera.lookAt(loadingScreen.box.position);
  loadingScreen.scene.add(loadingScreen.box);

  // create a loading manager to set RESOURCES_LOADED when appropraite.
  // Pass loadingManager to aol resource loaders

  loadingManager = new THREE.LoadingManager();

  loadingManager.onProgress = function(item, loaded, total){
		console.log(item, loaded, total);
	};

  loadingManager.onLoad = function(){
    console.log("loaded all resources");
    RESOURCES_LOADED = true;
  };



  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshPhongMaterial({color: 0xff4444, wireframe:USE_WIREFRAME})
  );

  mesh.position.y += 1; //move the mesh up 1 meter
  mesh.receiveShadow = true; 
  mesh.castShadow = true;
  
  scene.add(mesh);

  meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(10,10, 10,10),
    new THREE.MeshPhongMaterial({color: 0xffffff, wireframe:USE_WIREFRAME})
  );
  meshFloor.rotation.x -= Math.PI / 2;
  meshFloor.receiveShadow = true;
  mesh.castShadow= true;
  scene.add(meshFloor);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  light = new THREE.PointLight(0xffffff, 0.8, 18);
  light.position.set(-3, 6, -3);
  light.castShadow = true; 
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;
  scene.add(light);

  // lets load the textures 

  var textureLoader = new THREE.TextureLoader();
  crateTexture = textureLoader.load("crate0/crate0_diffuse.png");
  crateBumpMap = textureLoader.load("crate0/crate0_bump.png");
  crateNormalMap = textureLoader.load("crate0/crate0_normal.png");

  // create mesh with the textures

  crate = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshPhongMaterial({
      color:0xffffff,
      map: crateTexture,
      bumpMap: crateBumpMap,
      normalMap:crateNormalMap

    })
  );
  scene.add(crate);
  crate.position.set(2.5, 3/2, 2.5);
  crate.receiveShadow = true;
  crate.castShadow = true;

  // Model Material Loading

  // load models - remember loading in Javascrip is asynchronous, so you need to wrap the code in a function and pass it the index. If you don't then the index '_key' can change while the model is being downloaded
  //so the wrong model will be matched with the wrong index key
  
  for ( var _key in models){
    (function(key){
      var mtlLoader = new THREE.MTLLoader(loadingManager);
      mtlLoader.load(models[key].mtl, function(materials){
        materials.preload();

        var objLoader = new THREE.OBJLoader(loadingManager);

        objLoader.setMaterials(materials);
        objLoader.load(models[key].obj, function(mesh){
          mesh.traverse(function(node){
            if(node instanceof THREE.Mesh){
              node.castShadow = true;
              node.recieveShadow = true;
            }
          });
          models[key].mesh = mesh;
                })
      })
    })(_key);
  }
  
  




  camera.position.set(0, player.height,-5);
  camera.lookAt(new THREE.Vector3(0,player.height,0));

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(1280, 720);

  renderer.shadowMap.enabled = true; 
  renderer.shadowMap.type = THREE.BasicShadowMap;

  document.body.appendChild(renderer.domElement);

  animate();

}

function onResourcesLoaded(){
  
}

function animate(){

  // this block runs when resources are loading
  if ( RESOURCES_LOADED == false){
    requestAnimationFrame(animate);
    loadingScreen.box.position.x -= 0.05;
    if (loadingScreen.box.position.x < -10) loadingScreen.box.position.x = 10;
    loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);

    renderer.render(loadingScreen.scene, loadingScreen.camera);
    return; // stop the function here. 
  }

  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  crate.rotation.y += 0.01;

  if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
  }
  if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}

  

  if (keyboard[37]){ // left arrow key
    camera.rotation.y -= Math.PI * 0.01;
  }
  if (keyboard[39]){ // right arrow key
    camera.rotation.y += Math.PI * 0.01;

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
