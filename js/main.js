// CONSTANTS
const MOVE_SPEED = 0.40;

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
mesh.name = 'floor';
scene.add(mesh);

//Ceiling Plane

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
mesh.position.y = 20;
mesh.name = 'floor';
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

var model1 = new THREE.Object3D();
loader.load(
    '../models/skull/scene.gltf',
    function(gltf) {
        model1 = gltf.scene;
        model1.metalness = 0;
        model1.name = 'skull';
        model1.castShadow = true;
        scene.add(model1);
        model1.position.set(0, player.height, 20);
        const helper = new THREE.BoxHelper(model1); //creates clickable box around object so onClick intersect works
        helper.geometry.computeBoundingBox();
        helper.scale.set(2, 2, 2)
        helper.position.set(0, player.height, 20);
        helper.name = 'skull'
        helper.material.visible = false;
        scene.add(helper);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.log(error);
    }
);

//Object 2
var model2 = new THREE.Object3D();
loader.load(
    '../models/axe/scene.gltf',
    function(gltf) {
        model2 = gltf.scene;
        model2.metalness = 0;
        model2.name = 'axe';
        model2.castShadow = true;
        scene.add(model2);
        model2.position.set(20, player.height, 0);
        model2.scale.set(.3, .3, .3);
        const helper = new THREE.BoxHelper(model2);
        helper.geometry.computeBoundingBox();
        helper.scale.set(4, 4, 4);
        helper.position.set(20, player.height, 0);
        helper.name = 'axe'
        helper.material.visible = false;
        scene.add(helper);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.log(error);
    }
);



//Object 3
var model3 = new THREE.Object3D();
loader.load(
    '../models/chest/scene.gltf',
    function(gltf) {
        model3 = gltf.scene;
        model3.name = 'chest';
        model3.castShadow = true;
        scene.add(model3);
        model3.position.set(-20, 0, 0);
        model3.scale.set(.05, .05, .05);
        const helper = new THREE.BoxHelper(model3);
        helper.geometry.computeBoundingBox();
        helper.scale.set(2, 2, 2);
        helper.position.set(-20, 0, 0);
        helper.name = 'chest'
        helper.material.visible = false;
        scene.add(helper);
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


//NOTE: Ambient Light affects the three objects, but for some reason the point lights don't


//Ambient Light

var light = new THREE.AmbientLight(0xFFFFFF, 1); //White light
scene.add(light)

//Lamp 1
//Clicking Lamp1 (cube) Toggles PointLight1
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({
    color: 0xA6441A,
    opacity: 0.7,
    transparent: true
});
var mesh1 = new THREE.Mesh(geometry, material);
mesh1.name = "lamp1";
mesh1.position.set(-5, 2, 0);

//ColorChange 1
//Clicking Lamp1 (cube) Toggles PointLight1
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({
    color: 0xFFFFF,
    opacity: 0.7,
    transparent: true
});
var mesh = new THREE.Mesh(geometry, material);
mesh.name = "color_swap_1";
mesh.position.set(-5, 2, -5);
scene.add(mesh)

//Point Light 1
var light1 = new THREE.PointLight(0x0D16E1, 3.5, 100); //Purple light, 3.5 intensity, 150 units
light1.position.set(-10, 15, 0);
light1.intensity = 3
scene.add(light1); //Put light into box, box now lamp
scene.add(mesh1);

//Lamp 2
//Clicking Lamp2 (cube) Toggles PointLight2
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({
    color: 0xA6441A,
    opacity: 0.7,
    transparent: true
});
var mesh2 = new THREE.Mesh(geometry, material);
mesh2.name = "lamp2";
mesh2.position.set(5, 2, 0);

//ColorChange 2
//Clicking Lamp1 (cube) Toggles PointLight1
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({
    color: 0xFF0FFF,
    opacity: 0.7,
    transparent: true
});
var mesh = new THREE.Mesh(geometry, material);
mesh.name = "color_swap_2";
mesh.position.set(5, 2, -5);
scene.add(mesh)

//Point Light 2
var light2 = new THREE.PointLight(0xFF0000, 3.5, 100); //RED light, 3.5 intensity, 150 units in each direction
light2.intensity = 3
light2.position.set(10, 15, 0);
scene.add(light2); //Put light into box, box now lamp
scene.add(mesh2);

//Mallable Box
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF
});
var funBox = new THREE.Mesh(geometry, material);
funBox.name = "fun_box";
funBox.position.set(0, player.height, -15);
scene.add(funBox)

// MOUSE CONTROLS

var raycaster = new THREE.Raycaster();
var colorArray = [0xF925BE, 0x24E10D, 0xFF0000, 0xFFFFFF, 0x0D16E1, 0xA6441A, 0xFF0FFF];

function onClick(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Let player control game
    if (!pointerLockControls.isLocked) {
        pointerLockControls.lock();
    }


    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);
    //Rotates objects 3 RAD on X axis every click, doesnt work for loaded objects currently
    for (let i = 0; i < intersects.length; i++) {
        if (camera.position.distanceTo(intersects[i].object.position) < 20) {
            //Point lights turn on and off when lamps are clicked
            if (intersects[i].object.name == 'lamp1') {
                if (light1.visible == true) {
                    light1.visible = false;
                } else {
                    light1.visible = true;
                }
            } else if (intersects[i].object.name == 'lamp2') {
                if (light2.visible == true) {
                    light2.visible = false;
                } else {
                    light2.visible = true;
                }
            } else if (intersects[i].object.name == 'color_swap_1') {
                light1.color.setHex(colorArray[Math.floor(Math.random() * colorArray.length)]); //Pink
            } else if (intersects[i].object.name == 'color_swap_2') {
                light2.color.setHex(colorArray[Math.floor(Math.random() * colorArray.length)]); //Green
            } else if (intersects[i].object.name == 'fun_box') {
                if (flag4) {
                    flag4 = false;
                } else {
                    flag4 = true;
                }

            }

            if (intersects[i].object.name == 'skull' && !flag1) {
                flag1 = true;
                console.log(model1);
            } else if (intersects[i].object.name == 'skull' && flag1) {
                flag1 = false;
            }
            if (intersects[i].object.name == 'axe' && !flag2) {
                flag2 = true;
                console.log(model2);
            } else if (intersects[i].object.name == 'axe' && flag2) {
                flag2 = false;
            }
            if (intersects[i].object.name == 'chest' && !flag3) {
                flag3 = true;
                console.log(model3);
            } else if (intersects[i].object.name == 'chest' && flag3) {
                flag3 = false;
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

//CAMERA BOUNDS
var bounds = function() {
    var loc = camera.position;
    if (loc.x > 25 || loc.z > 25 || loc.x < -25 || loc.z < -25) {
        camera.position.set(0, player.height, -5)
    }
}


//GAME LOOP FUNCTIONS

//Update render/graphic values, clear, render
var render = function() {
    if (flag1) {
        //model1.rotation.x += 0.05;
        model1.rotation.y += 0.05;
    }
    if (flag2) {
        //model2.rotation.x += 0.05;
        model2.rotation.y += 0.05;
    }
    if (flag3) {
        //model3.rotation.x += 0.05;
        model3.rotation.y += 0.05;
    }
    if (flag4) {
        if (!flag5) {
            funBox.position.x -= 0.5;
            if (funBox.position.x < -10) {
                flag5 = true;
            }
        } else {
            funBox.position.x += 0.5;
            if (funBox.position.x > 10) {
                flag5 = false;
            }
        }
    }
    // Render function
    renderer.clear();
    renderer.render(scene, camera);
};

var raycaster = new THREE.Raycaster(); //Casts ray from camera, used for click detection
var mouse = new THREE.Vector2();

//Update variable values
var update = function() {

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
    bounds();

};

flag1 = false;
flag2 = false;
flag3 = false;
flag4 = false;
flag5 = false;
//Called 60 times/second
var gameLoop = function() {
    requestAnimationFrame(gameLoop);
    //Animated cubes and lights for an extra feature --> can remove

    mesh1.rotation.x += 0.01;
    mesh2.rotation.x += 0.01;
    mesh1.rotation.y += 0.01;
    mesh2.rotation.y += 0.01;

    // if (light1.intensity <= 5 && !flag) {
    //     light1.intensity += 0.03;
    //     light2.intensity += 0.03;
    // } else if (light1.intensity > 0) {
    //     light1.intensity -= 0.03;
    //     light2.intensity -= 0.03;
    //     flag = true;
    // } else {
    //     flag = false;
    // }

    update();
    render();
};

gameLoop();