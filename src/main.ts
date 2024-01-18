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

const clock = new THREE.Clock();
let delta = 0;

var line: Line2;
var MAX_POINTS = 500;
var drawCount = 0;

// geometry
var geometry = new LineGeometry();

// attributes
var positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
// geometry.setPositions(positions);

// material
var material = new LineMaterial({ color: 0xff0000, linewidth: 5 });
material.resolution.set(window.innerWidth, window.innerHeight);

// line
line = new Line2(geometry, material);
scene.add(line);

function updatePositions() {
  var positions = [];
  var x = 0;
  var y = 0;
  var z = 0;
  var index = 0;

  for (var i = 0, l = MAX_POINTS; i < l; i++) {
    x += (Math.random() - 0.5) * 30;
    y += (Math.random() - 0.5) * 30;
    z += (Math.random() - 0.5) * 30;

    positions[index++] = x;
    positions[index++] = y;
    positions[index++] = z;
  }

  line.geometry.setPositions(positions);
}

updatePositions();
animate();
function animate() {
  requestAnimationFrame(animate);
  delta += clock.getDelta();
  if (delta > 1) {
    delta = 0;
  }

  drawCount = (drawCount + 1) % MAX_POINTS;

  line.geometry.instanceCount = drawCount;

  if (drawCount === 0) {
    // periodically, generate new data

    updatePositions();
    line.material.color.setHSL(Math.random(), 1, 0.5);
  }

  renderer.render(scene, camera);
}
