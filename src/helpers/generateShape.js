import * as THREE from 'three';
import getInputValues from './getInputValues';
import generateRandomGeometry from './generateRandomGeometry';
import generateRandomMaterial from './generateRandomMaterial';
import clearScene from './clearScene';
import { textures } from '../utils/textures';

export default function generateShape(scene, meshes) {
    clearScene(scene);

    const shapeSize = getInputValues();
    meshes.length = 0;

    for (let x = 1; x <= shapeSize.xValue; x++) {
        for (let y = 1; y <= shapeSize.yValue; y++) {
            for (let z = 1; z <= shapeSize.zValue; z++) {
                const geometry = generateRandomGeometry();
                const map = generateRandomMaterial(textures);
                const material = new THREE.MeshBasicMaterial({ map });
                const mesh = new THREE.Mesh(geometry, material);
                
                mesh.position.set((x - shapeSize.xValue / 2 - 0.5) * 1.2, (y - shapeSize.yValue / 2 - 0.5) * 1.2, (z - shapeSize.zValue / 2 - 0.5) * 1.2);

                scene.add(mesh);
                meshes.push(mesh);
            }
        }
    }
}