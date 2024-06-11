export default function generateRandomMaterial(textures) {
    const randomIndex = Math.floor(Math.random() * textures.length);

    return textures[randomIndex];
}