// CONSTANTS
const MOVE_SPEED = 0.25;

// Player Object
var player = { height: 1.8 };

//Init Scene and Camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, player.height, -5);
camera.lookAt(0, player.height, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#e5e5e5"); //Background colour is grey
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true; //Required for GLTFLoader to work

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => { //Listen for window resize, adjust renderer size and camera accordingly
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

var axes = new THREE.AxesHelper(30);
scene.add(axes); //Adds xyz axis reference lines in middle of scene, comment out when finished

//First Person Controls
var pointerLockControls = new THREE.PointerLockControls(camera, renderer.domElement);

pointerLockControls.addEventListener('lock', function() {

});

pointerLockControls.addEventListener('unlock', function() {

});

pointerLockControls.connect();


//FloorPlane

var textureLoader = new THREE.TextureLoader();
var texture = new textureLoader.load('../textures/floor/hardwood.jpg');
var geometry = new THREE.PlaneGeometry(50, 50, 1);
var material = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    map: texture,
    side: THREE.DoubleSide
});
var mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-.5 * Math.PI); //Rotate 90Deg or .5Rad to create floor

scene.add(mesh);

//Wall 1

var textureLoader = new THREE.TextureLoader();
var texture = new textureLoader.load('../textures/wall/wall_texture.jpg');
var geometry = new THREE.PlaneGeometry(50, 25, 1);
var material = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    map: texture,
    side: THREE.DoubleSide
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.z = 25;
mesh.position.y = 12;

scene.add(mesh);


//Wall 2

var geometry = new THREE.PlaneGeometry(50, 25, 1);
var material = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    map: texture,
    side: THREE.DoubleSide
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.z = -25;
mesh.position.y = 12;

scene.add(mesh);

//Wall 3

var geometry = new THREE.PlaneGeometry(50, 25, 1);
var material = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    map: texture,
    side: THREE.DoubleSide
});
var mesh = new THREE.Mesh(geometry, material);
mesh.rotateY(-.5 * Math.PI); //Rotate 90Deg or .5Rad to create floor
mesh.position.set(25, 12, 0);

scene.add(mesh);

//Wall 4

var geometry = new THREE.PlaneGeometry(50, 25, 1);
var material = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    map: texture,
    side: THREE.DoubleSide
});
var mesh = new THREE.Mesh(geometry, material);
mesh.rotateY(-.5 * Math.PI); //Rotate 90Deg or .5Rad to create floor
mesh.position.set(-25, 12, 0);

scene.add(mesh);

//Object 1

var loader = new THREE.GLTFLoader();

var dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath('../libs/draco');
loader.setDRACOLoader(dracoLoader);

loader.load(
    '../models/skull/scene.gltf',
    function(gltf) {
        scene.add(gltf.scene);
        gltf.animations;
        gltf.scene;
        gltf.scenes;
        gltf.cameras;
        gltf.asset;
        gltf.scene.children[0].position.set(0, player.height, 20);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.log(error);
    }
);

//Object 2
var model = new THREE.Object3D();
loader.load(
    '../models/ship/scene.gltf',
    function(gltf) {
        model = gltf.scene;
        model.name = 'ship';
        scene.add(model);
        model.position.set(20, player.height, 0);
        model.scale.set(.01, .01, .01);
        console.log(model, model.name,model.type);
        /*
        scene.add(gltf.scene);
        gltf.animations;
        gltf.scene;
        gltf.scenes;
        gltf.cameras;
        gltf.asset;
        gltf.scene.children[0].position.set(20, player.height, 0);
        gltf.scene.children[0].scale.set(.01, .01, .01);
        */
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.log(error);
    }
);

//Object 3

loader.load(
    '../models/drone/scene.gltf',
    function(gltf) {
        scene.add(gltf.scene);
        gltf.animations;
        gltf.scene;
        gltf.scenes;
        gltf.cameras;
        gltf.asset;
        gltf.scene.children[0].position.set(-20, player.height, 0);
        gltf.scene.children[0].scale.set(.01, .01, .01);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.log(error);
    }
);

//mesh.position.set(2, 2, -2); //xyz positioning
//mesh.rotation.set(45, 0, 0); //xyz rotation
//mesh.scale.set(1, 2, 1);  //xyz scaling

//Ambient Light

var light = new THREE.AmbientLight(0xFFFFFF,1); //White light
scene.add(light)

//Lamp 1
//Clicking Lamp1 (cube) Toggles PointLight1
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({
    color: 0xA6441A,
    opacity: 0.7,
    transparent:true
});
var mesh = new THREE.Mesh(geometry, material);
mesh.name = "lamp1";
mesh.position.set(-5, 2, 0);

//Point Light 1
var light1 = new THREE.PointLight(0xFFFFFF, 4, 50);
light1.position.set(-10,15,0);
scene.add(light1); //Put light into box, box now lamp
scene.add(mesh);

//Lamp 2
//Clicking Lamp2 (cube) Toggles PointLight2
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({
    color: 0xA6441A,
    opacity: 0.7,
    transparent:true
});
var mesh = new THREE.Mesh(geometry, material);
mesh.name = "lamp2";
mesh.position.set(5, 2, 0);

//Point Light 2
var light2 = new THREE.PointLight(0xFFFFFF, 4, 50); //White light, 4 intensity, 50 units in each direction
light2.position.set(10,15,0);
scene.add(light2); //Put light into box, box now lamp
scene.add(mesh);

// MOUSE CONTROLS

var raycaster = new THREE.Raycaster();

function onClick(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);
    //Rotates objects 3 RAD on X axis every click, doesnt work for loaded objects currently
    for (let i = 0; i < intersects.length; i++) {
        if (camera.position.distanceTo(intersects[i].object.position) < 7) {
            //Point lights turn on and off when lamps are clicked
            if (intersects[i].object.name == 'lamp1'){
                if (light1.visible == true){
                    light1.visible = false;
                } else {
                    light1.visible = true;
                }
            } else if (intersects[i].object.name == 'lamp2'){
                if (light2.visible == true){
                    light2.visible = false;
                } else {
                    light2.visible = true;
                }
            //Clicking the other three objects should rotate them
            } else {

                intersects[i].object.rotateX(3); //Can check objects name with "intersects[i].object.name == 'Something'" if one is set
            }
        }
    }

}

window.addEventListener('click', onClick, false); //Adds func onClick as click action

// KEYBOARD CONTROLS

var keyboard = {};
//87 - W / 65 - A / 83 - S / 68 - D
function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
    if (event.keyCode == 27) { //Key 27 - Esc Key
        if (pointerLockControls.isLocked) {
            pointerLockControls.unlock();
        } else {
            pointerLockControls.lock();
        }
    }
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

//IN BOUNDS LOGIC || DOESNT WORK, Maybe try implementing differently

//Check direction of movement and position, prevent out of bounds movement
//
// var checkBounds = function(direction) {
//     var flag = true;
//     var direction = new THREE.Vector3();
//     camera.getWorldDirection(direction); //Buts camera direction into Vec3 direction
//     console.log(direction);
//     console.log(camera.position);
//     if (direction == "forward") {
//         if (camera.positon.x + 0.5 > 23 && direction.x > 0) {
//             flag = false;
//         }
//     }
//     if (direction == "backward") {
//         if (camera.position.x - 0.5 < -23 || camera.position.x + 0.5 > 23 || camera.position.z - 0.5 < -23 || camera.position.z + 0.5 > 23) {
//             flag = false;
//         }
//     }
//     if (direction == "left") {
//         if (camera.position.x - 0.5 < -23 || camera.position.x + 0.5 > 23 || camera.position.z - 0.5 < -23 || camera.position.z + 0.5 > 23) {
//             flag = false;
//         }
//     }
//     if (direction == "right") {
//         if (camera.position.x - 0.5 < -23 || camera.position.x + 0.5 > 23 || camera.position.z - 0.5 < -23 || camera.position.z + 0.5 > 23) {
//             flag = false;
//         }
//     }
//     return flag;
// }

//GAME LOOP FUNCTIONS


//Update render/graphic values, clear, render
var render = function() {
    // Render function
    renderer.clear();
    renderer.render(scene, camera);
};

var clock = new THREE.Clock(); //clock.getDelta used for physics, might not need
var raycaster = new THREE.Raycaster(); //Casts ray from camera, used for click detection
var mouse = new THREE.Vector2();


//Update variable values
var update = function() {
    var delta = clock.getDelta();

    //87 - W / 65 - A / 83 - S / 68 - D
    if (pointerLockControls.isLocked) { //Only allow movement if mouse locked on canvas
        if (keyboard[87]) {
            pointerLockControls.moveForward(MOVE_SPEED);
        }
        if (keyboard[83]) {
            pointerLockControls.moveForward(-MOVE_SPEED);
        }
        if (keyboard[65]) {
            pointerLockControls.moveRight(-MOVE_SPEED);
        }
        if (keyboard[68]) {
            pointerLockControls.moveRight(MOVE_SPEED);
        }
    }

};


//Called 60 times/second
var gameLoop = function() {
    requestAnimationFrame(gameLoop);

    update();
    render();
};

gameLoop();