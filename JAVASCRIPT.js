// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Car body (simplified)
const carBodyGeometry = new THREE.BoxGeometry(4, 1, 2);
const carBodyMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const carBody = new THREE.Mesh(carBodyGeometry, carBodyMaterial);
carBody.position.set(0, 0, 0);
scene.add(carBody);

// Car wheels (4 cylinders)
function createWheel(x, z) {
    const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(x, -0.5, z);
    scene.add(wheel);
}

createWheel(-1.5, 1);   // Front-left wheel
createWheel(1.5, 1);    // Front-right wheel
createWheel(-1.5, -1);  // Back-left wheel
createWheel(1.5, -1);   // Back-right wheel

// Car windows (simplified)
const windowGeometry = new THREE.BoxGeometry(1.5, 0.5, 0.1);
const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb });
const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
window1.position.set(0, 0.5, 1);
scene.add(window1);

// Position camera
camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the car for effect
    carBody.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
