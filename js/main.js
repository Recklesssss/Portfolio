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
const renderer = new THREE.WebGLRenderer({antialias: true});// for smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfffff,1)// background color of the canvas or the whole scene
document.body.appendChild(renderer.domElement); // Append the renderer to the document body it add the renderer to the html

//Light ambient light is a soft light that affects all objects equally
let ambientLight = new THREE.AmbientLight(0x101010,1.0);// the first parameter is the color and the sencond is the intensity the rest are the decay and distance
ambientLight.position.copy(camera.position); // Set the position of the light to the camera position
scene.add(ambientLight); // we musn't forget to add the light to the scene and other objects that affects the scene

//Direction light
let sunLight = new THREE.DirectionalLight(0xddddd, 1.0); // color and intensity
sunLight.position.y = 15;
scene.add(sunLight);

let geometry = new THREE.BoxGeometry(1, 1, 1); // Create a box geometry
let material = new THREE.MeshStandardMaterial({color: 0xff000}); // Create a standard material with a green color 
let mesh = new THREE.Mesh(geometry, material); // Create a mesh with the geometry and material

scene.add(mesh); // Add the mesh to the scene
//renderer
renderer.render(scene,camera)