// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~

let scene, camera, renderer, videogame;

function init() {
    // Scene and camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
    scene.add(light);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Load 3D Model
    const loader = new GLTFLoader();
    loader.load('snes/snes-with-games.gltf', function (gltf) {
        videogame = gltf.scene;
        videogame.position.y = -1;
        videogame.rotation.y = Math.PI; // Initial Y-rotation
        scene.add(videogame);
    });
}

// Animate scene
function animate() {
    if (videogame) {
        videogame.rotation.y += 0.001; // Rotate horizontally (Y-axis)
    }
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
renderer.setAnimationLoop(animate);