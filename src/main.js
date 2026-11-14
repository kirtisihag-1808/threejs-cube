import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './style.css';

// 1. Scene & Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.set(0, 0, 1200);

// 2. CSS3D Renderer
const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3. OrbitControls (Drag background to spin)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 4. Cube Group
const cubeGroup = new THREE.Group();
scene.add(cubeGroup);

const size = 500; // Must match .cube-face width/height in style.css
const half = size / 2;

// Put your 6 website URLs here (Note: sites like Google/YouTube block iframes)
const faces = [
  { name: 'front',  title: 'Front — Wikipedia',  url: 'https://wikipedia.org', pos: [0, 0, half],  rot: [0, 0, 0] },
  { name: 'right',  title: 'Right — Three.js',   url: 'https://threejs.org',        pos: [half, 0, 0],  rot: [0, Math.PI / 2, 0] },
  { name: 'back',   title: 'Back — Example',     url: 'https://example.com',        pos: [0, 0, -half], rot: [0, Math.PI, 0] },
  { name: 'left',   title: 'Left — MDN Docs',    url: 'https://mozilla.org', pos: [-half, 0, 0], rot: [0, -Math.PI / 2, 0] },
  { name: 'top',    title: 'Top — OpenStreetMap',url: 'https://openstreetmap.org', pos: [0, half, 0], rot: [-Math.PI / 2, 0, 0] },
  { name: 'bottom', title: 'Bottom — Archive',   url: 'https://archive.org',        pos: [0, -half, 0], rot: [Math.PI / 2, 0, 0] }
];

const faceRotations = {
  front:,
  right:  [0, -Math.PI / 2],
  back:   [0, Math.PI],
  left:   [0, Math.PI / 2],
  top:    [Math.PI / 2, 0],
  bottom: [-Math.PI / 2, 0]
};

faces.forEach((face) => {
  const container = document.createElement('div');
  container.className = 'cube-face';

  container.innerHTML = `
    <div class="face-bar">
      <span>${face.title}</span>
      <a href="${face.url}" target="_blank" rel="noopener">Open ↗</a>
    </div>
    <iframe src="${face.url}" loading="lazy"></iframe>
  `;

  const object = new CSS3DObject(container);
  object.position.set(...face.pos);
  object.rotation.set(...face.rot);
  cubeGroup.add(object);
});

// 5. Button Rotation Controls
let targetRot = { x: 0, y: 0 };

document.querySelectorAll('#nav-controls button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const face = btn.getAttribute('data-face');
    const [rx, ry] = faceRotations[face];
    targetRot.x = rx;
    targetRot.y = ry;
    camera.position.set(0, 0, 1200);
  });
});

// 6. Handle Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 7. Animation Loop
function animate() {
  requestAnimationFrame(animate);
  cubeGroup.rotation.x += (targetRot.x - cubeGroup.rotation.x) * 0.1;
  cubeGroup.rotation.y += (targetRot.y - cubeGroup.rotation.y) * 0.1;
  controls.update();
  renderer.render(scene, camera);
}

animate();