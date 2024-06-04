import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

/**
 * Loading Manager
 */
const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(`Started loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files.`);
};

manager.onLoad = function () {
    console.log('All textures loaded.');
};

manager.onError = function (url) {
    console.error(`There was an error loading ${url}`);
};

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader(manager);
const textures = [
    textureLoader.load('/textures/fire.jpg'),
    textureLoader.load('/textures/grass.jpg'),
    textureLoader.load('/textures/sand.avif'),
    textureLoader.load('/textures/water.avif')
];

const shapeGeometry = generateRandomGeometry();
const shapeMaterial = new THREE.MeshBasicMaterial({ map: textures[0]})
const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);

scene.add(shape);

let meshes = [shape];

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

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


function getInputValues() {
    const xValue = parseInt(document.getElementById('xAxios').value);
    const yValue = parseInt(document.getElementById('yAxios').value);
    const zValue = parseInt(document.getElementById('axiosZ').value);

    if (xValue < 1 || yValue < 1 || zValue < 1) {
        alert('pls dont use negative numbers');

        return;
    }

    return { xValue, yValue, zValue };
}


function generateRandomGeometry() {
    const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.CylinderGeometry(0.5, 0.5, 1, 32)
    ];

    const randomIndex = Math.floor(Math.random() * geometries.length);

    return geometries[randomIndex];
}

function generateRandomMaterial() {
    const randomIndex = Math.floor(Math.random() * textures.length);

    return textures[randomIndex];
}

function generateShape() {
    while(scene.children.length > 0){
        scene.remove(scene.children[0]);
    }

    const shapeSize = getInputValues();
    meshes = [];

    for (let x = 1; x <= shapeSize.xValue; x++) {
        for (let y = 1; y <= shapeSize.yValue; y++) {
            for (let z = 1; z <= shapeSize.zValue; z++) {
                const geometry = generateRandomGeometry();
                const map = generateRandomMaterial();
                const material = new THREE.MeshBasicMaterial({ map });
                const mesh = new THREE.Mesh(geometry, material);
                
                mesh.position.set((x - shapeSize.xValue / 2 - 0.5) * 1.2, (y - shapeSize.yValue / 2 - 0.5) * 1.2, (z - shapeSize.zValue / 2 - 0.5) * 1.2);

                scene.add(mesh);
                meshes.push(mesh);
            }
        }
    }
}

function explodeShapes() {
    meshes.forEach(mesh => {
        let newPosition;

        if (mesh.position.x === 0 && mesh.position.y === 0 && mesh.position.z === 0) {
            const moveHigher = new THREE.Vector3(2, 2, 2);
            newPosition = mesh.position.clone().add(moveHigher);
        } else {
            const randomDirection = new THREE.Vector3(
                (Math.random() * 5) * mesh.position.x,
                (Math.random() * 5) * mesh.position.y,
                (Math.random() * 5) * mesh.position.z
            );
            newPosition = mesh.position.clone().add(randomDirection);
        }

        gsap.to(mesh.position, {
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z,
            duration: 1,
            ease: 'power2.out'
        });
    });
}

const generateButton = document.getElementById('shapeGenerator')
generateButton.addEventListener('click', generateShape);

const explodeButton = document.getElementById('explodeButton');
explodeButton.addEventListener('click', explodeShapes);

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