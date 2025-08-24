import * as THREE from '../three.js-dev/build/three.module.js';
// console.log(THREE); // This will log the THREE.js module to the console
const scene = new THREE.Scene(); // the first step is creating a scene
const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane 
); 
scene.add(camera);
camera.position.z = 5;// need carefull looking at the object

//Renderer
const renderer = new THREE.WebGLRenderer({antialias: false});// for smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfffff,1)// background color of the canvas or the whole scene
document.body.appendChild(renderer.domElement); // Append the renderer to the document body it add the renderer to the html

//Light ambient light is a soft light that affects all objects equally
let ambientLight = new THREE.AmbientLight(0x101010,1.0);// the first parameter is the color and the sencond is the intensity the rest are the decay and distance
ambientLight.position.copy(camera.position); // Set the position of the light to the camera position
scene.add(ambientLight); // we musn't forget to add the light to the scene and other objects that affects the scene

//Direction light
let sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // color and intensity
sunLight.position.y = 15;
scene.add(sunLight);

let geometry = new THREE.BoxGeometry(1, 1, 1); // Create a box geometry
let material = new THREE.MeshBasicMaterial({color: 'blue'}); // Create a standard material with a green color 
let cube = new THREE.Mesh(geometry, material); // Create a mesh with the geometry and material

scene.add(cube); // Add the mesh to the scene

//controls
document.addEventListener( 'keydown',onkeydown,false);
function onkeydown(e){
    let keycode = e.which;

    if (keycode === 39){
        camera.translateX(-0.05);
    }
    else if (keycode === 37){
        camera.translateX(0.05);
    }
    else if (keycode === 38){
        camera.translateZ(-0.05);
    }
    else if (keycode === 40){
        camera.translateZ(0.05);
    }
}

//renderer
let rendererloop = function (){
    requestAnimationFrame(rendererloop);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene,camera);
}
rendererloop();