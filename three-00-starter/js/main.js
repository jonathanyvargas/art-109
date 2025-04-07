// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~

let scene, camera, renderer, cube;

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // ~~~~~~~~~~ Set up scene. camera + renderer ~~~~~~~~
    // const light = new THREE.DirectionalLight(0xffffff, 3);
    // light.position.set(1,1,5);
    // scene.add(light);

    const light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
    scene.add( light );
    
    // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models

    loader.load('snes/system.gltf', function (gltf){
        const videogame = gltf.scene;
        scene.add(videogame);
    })
    
    
    
    // ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
    // →→→→→→ Follow next steps in tutorial: 
    // // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
    
    
    // ~~~~~~~ Cube ~~~~~~~~~~~~~~~
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const texture = new THREE.TextureLoader().load('textures/FloorsCheckerboard_S_Diffuse.jpg');
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    
    // ~~~~~~~ camera position ~~~~~~~~

    camera.position.z = 5;

}

// ~~~~~~ Renderer ~~~~~~~~~~~~

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
  }

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

  init();
  renderer.setAnimationLoop( animate );

  