import * as THREE from 'three';

export default function generateRandomGeometry() {
    const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.CylinderGeometry(0.5, 0.5, 1, 32)
    ];

    const randomIndex = Math.floor(Math.random() * geometries.length);

    return geometries[randomIndex];
}
