import { Line2, LineGeometry, LineMaterial } from "three-fatline";

import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";

import * as THREE from "three";

var renderer: THREE.WebGLRenderer,
  scene: THREE.Object3D<THREE.Object3DEventMap>,
  camera: THREE.Camera,
  controls;

let emptyArray = new Array(2400).map(() => 0);
let positions = new Float32Array(emptyArray);
let myLine: Line2;

init();
animate();

function init() {
  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 50, 20);

  // controls
  controls = new OrbitControls(camera, renderer.domElement);

  scene.add(new THREE.GridHelper());

  let lineMaterial = new LineMaterial({
    color: 0xffff,
    linewidth: 5,
    // alphaToCoverage: true,
  });

  myLine = new Line2(new LineGeometry(), lineMaterial);
  myLine.geometry.setPositions(positions);
  myLine.material.resolution.set(innerWidth, innerHeight);
  scene.add(myLine);
}

function animate() {
  requestAnimationFrame(animate);
  for (let index = 0; index < positions.length; index++) {
    // const pos = new THREE.Vector3(
    //   Math.floor(Math.random() * (100 - -100 + 1)) + -100,
    //   Math.floor(Math.random() * (100 - -100 + 1)) + -100,
    //   Math.floor(Math.random() * (100 - -100 + 1)) + -100
    // );

    positions[index] = Math.floor(Math.random() * (100 - -100 + 1)) + -100;
    // positions[index] = pos; //Not working
  }

  myLine.geometry.setPositions(positions);
  myLine.geometry.setFromPoints;
  // myLine.material.resolution.set(innerWidth, innerHeight);

  renderer.render(scene, camera);
}
