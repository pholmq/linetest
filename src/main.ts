import { Line2, LineGeometry, LineMaterial } from "three-fatline";

import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";

import * as THREE from "three";

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
// scene
const scene = new THREE.Scene();
// camera
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.set(0, 50, 20);
// controls
new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.GridHelper());

let line: Line2;
let MAX_POINTS = 1000;
let drawCount = 0;

// geometry
let geometry = new LineGeometry();

// attributes
let positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
// geometry.setPositions(positions);

// material
let material = new LineMaterial({ color: 0xff0000, linewidth: 5 });
material.resolution.set(window.innerWidth, window.innerHeight);
line = new Line2(geometry, material);
scene.add(line);
let x = 0;
let y = 0;
let z = 0;
let index = 0;
animate();
function animate() {
  requestAnimationFrame(animate);
  x += (Math.random() - 0.5) * 30;
  y += (Math.random() - 0.5) * 30;
  z += (Math.random() - 0.5) * 30;
  positions[index++] = x;
  positions[index++] = y;
  positions[index++] = z;
  line.geometry.instanceCount = drawCount;

  drawCount = (drawCount + 1) % MAX_POINTS;
  line.geometry.setPositions(positions);

  if (drawCount === 0) {
    // periodically, generate new data
    index = 0;
    line.material.color.setHSL(Math.random(), 1, 0.5);
  }
  renderer.render(scene, camera);
}
