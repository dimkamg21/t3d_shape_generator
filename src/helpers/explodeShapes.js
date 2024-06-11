import gsap from 'gsap';
import * as THREE from 'three';

export default function explodeShapes(meshes) {
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

        const animationParams = {
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z,
            duration: 1,
            ease: 'power2.out'
        };

        gsap.to(mesh.position, animationParams);
        gsap.to(mesh.rotation, animationParams);
    });
};
