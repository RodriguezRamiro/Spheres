const scene = new THREE.Scene();

// Camera from top-down
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0, 5, 0); // Looking down from Y axis
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(600, 600);
document.getElementById('container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Central Planet
const planetGeometry = new THREE.SphereGeometry(0.5, 64, 64);
const planetMaterial = new THREE.MeshPhongMaterial({ color: 0x77ccff });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.position.set(0, 0, 0);
scene.add(planet);

// Moons
const moonCount = 3;
const moons = [];

for (let i = 0; i < moonCount; i++) {
  const moonGeo = new THREE.SphereGeometry(0.1, 16, 16);
  const moonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const moon = new THREE.Mesh(moonGeo, moonMat);
  moon.userData = {
    angle: i * ((2 * Math.PI) / moonCount),
    radius: 2 + 0.2 * i, // slightly different distances
    speed: 0.01 + i * 0.002,
  };
  moons.push(moon);
  scene.add(moon);
}

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Orbit the moons around the planet (top-down orbit)
  moons.forEach(moon => {
    moon.userData.angle += moon.userData.speed;
    moon.position.x = Math.cos(moon.userData.angle) * moon.userData.radius;
    moon.position.z = Math.sin(moon.userData.angle) * moon.userData.radius;
    moon.position.y = 0;
  });

  renderer.render(scene, camera);
}

animate();
