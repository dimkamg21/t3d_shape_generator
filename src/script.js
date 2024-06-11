import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import explodeShapes from './helpers/explodeShapes';
import generateShape from './helpers/generateShape';
import generateRandomGeometry from './helpers/generateRandomGeometry';
import { textures } from './utils/textures';
import { sizes } from './utils/sizes';


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

const shapeGeometry = generateRandomGeometry();
const shapeMaterial = new THREE.MeshBasicMaterial({ map: textures[0]})
const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);

scene.add(shape);

let meshes = [shape];

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const generateButton = document.getElementById('shapeGenerator')
generateButton.addEventListener('click', () => generateShape(scene, meshes));

const explodeButton = document.getElementById('explodeButton');
explodeButton.addEventListener('click',  () => explodeShapes(meshes));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();