import * as THREE from 'three';

/**
 * Loading Manager
 */
const manager = new THREE.LoadingManager();

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

export const textures = [
    textureLoader.load('/textures/fire.webp'),
    textureLoader.load('/textures/grass.webp'),
    textureLoader.load('/textures/sand.webp'),
    textureLoader.load('/textures/water.webp')
];
