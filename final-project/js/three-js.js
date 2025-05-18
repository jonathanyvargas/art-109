import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, mixer, clock;
let phaseIndex = 0;
let isPlaying = false;
let animationsPhasesMap = {};
let currentActions = [];

const frameRate = 24; // Your defined frame rate
const phaseFrameRanges = [
    [1, 45], // Phase 1: frames 1 to 45 (45 frames total)
    [46, 145], // Phase 2: frames 46 to 145 (100 frames total)
    [146, 245], // Phase 3: frames 146 to 245 (100 frames total)
    [246, 300] // Phase 4: frames 246 to 300 (55 frames total)
];

const animationNames = {
    'Cart-slot': 'Insert-game',
     'Chrono-Trigger': 'Play-Chrono-Trigger',
     'Earthbound': 'Play-Earthbound',
     'Eject': 'Eject-game',
    'Killer-Instinct': 'Play-Killer-Instinct',
    'Power': 'Power-on',
    'Reset': 'Reset-game',
    'Light-glow': 'Light-change'
};

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x080820, 1));
    new OrbitControls(camera, renderer.domElement);

    clock = new THREE.Clock();

    const loader = new GLTFLoader();
    loader.load('snes/snes-with-games.gltf', (gltf) => {
    const model = gltf.scene;
    model.position.y = -1;
    model.rotation.y = Math.PI; // Assuming you want the model rotated 180 degrees
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);

    gltf.animations.forEach((clip) => {
    for (const [objectName, animName] of Object.entries(animationNames)) {
    if (clip.name === animName) {
    // Map object names (like 'Cart-slot') to an array of phase subclips
    animationsPhasesMap[objectName] = phaseFrameRanges.map(
    ([start, end], idx) =>
     // *** CORRECTED LINE: Added +1 to the end frame argument ***
     // This ensures the subclip includes the full duration up to the end of the 'end' frame.
     THREE.AnimationUtils.subclip(clip, `${clip.name}_phase${idx + 1}`, start, end + 1, frameRate)
     );
     }
    }
    });

        // Optional: Log the created subclips to verify
        // console.log('Created Animation Phases Map:', animationsPhasesMap);


     renderer.domElement.addEventListener('click', onClick);
     });
}

function onClick(event) {
    // Prevent clicking again while an animation is playing
    if (isPlaying) return;

    isPlaying = true;

    // Stop any currently playing actions from the previous phase
    currentActions.forEach(action => action.stop());
    currentActions = []; // Clear the list

    const [startFrame, endFrame] = phaseFrameRanges[phaseIndex];

    // Calculate duration including the end frame (end - start + 1 frames)
    // This duration should now match the actual duration of the subclip created with end + 1
    const duration = (endFrame - startFrame + 1) / frameRate;

    // Removed buffer time - the timeout should now align with the corrected clip duration

    for (const [objectName, clips] of Object.entries(animationsPhasesMap)) {
        // Get the subclip for the current phase index
    const clip = clips[phaseIndex];

        // Create and play the action
    const action = mixer.clipAction(clip);
    action.reset();
    action.setLoop(THREE.LoopOnce, 1);
     action.clampWhenFinished = true; // Keep the final state of the animation
    action.play();

     currentActions.push(action); // Store action to stop it later
    }

    // Set timeout based on the correct duration
    // This should now allow the state to update when the animation action truly finishes.
    setTimeout(() => {
    isPlaying = false; // Allow clicking again
    phaseIndex = (phaseIndex + 1) % phaseFrameRanges.length; // Move to the next phase, wrapping around
    // console.log(`Finished phase ${phaseIndex === 0 ? phaseFrameRanges.length : phaseIndex}. Next phase index: ${phaseIndex}`); // Optional log
    }, duration * 1000);
}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta(); // Get time elapsed since last frame
    if (mixer) mixer.update(delta); // Update the animation mixer
    renderer.render(scene, camera); // Render the scene
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Event listener for window resizing
window.addEventListener('resize', onWindowResize);

// Initialize the scene and start the animation loop
init();
animate();