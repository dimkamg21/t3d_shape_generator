export default function clearScene(scene) {
    scene.traverse(node => {
      if (node.geometry) node.geometry.dispose();
      if (node.material) {
        if (Array.isArray(node.material)) {
          node.material.forEach(material => material.dispose());
        } else {
          node.material.dispose();
        }
      }
    });
  
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
  }