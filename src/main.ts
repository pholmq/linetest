import { Line2, LineGeometry, LineMaterial } from "three-fatline";

import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";

import * as THREE from "three";

var renderer: THREE.WebGLRenderer,
  scene: THREE.Object3D<THREE.Object3DEventMap>,
  camera: THREE.Camera,
  controls;

const arrLength = 10000;

let positions = new Array(arrLength * 3);
let myLine: Line2;

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
myLine.material.resolution.set(innerWidth, innerHeight);
scene.add(myLine);

let vecA = new THREE.Vector3();
let vecB = new THREE.Vector3();
let curveArr: THREE.Vector3[] = [];
// let curve = new THREE.CatmullRomCurve3();
let curvePoints;
let indx = 0;
let clock = new THREE.Clock();
let delta = 0;
animate();
function animate() {
  requestAnimationFrame(animate);
  delta += clock.getDelta();
  if (delta > 1) {
    delta = 0;
    // vecA.set(
    //   Math.floor(Math.random() * (100 - -100 + 1)) + -100,
    //   Math.floor(Math.random() * (100 - -100 + 1)) + -100,
    //   Math.floor(Math.random() * (100 - -100 + 1)) + -100
    // );
    // vecB.set(
    //   Math.floor(Math.random() * (100 - -100 + 1)) + -100,
    //   Math.floor(Math.random() * (100 - -100 + 1)) + -100,
    //   Math.floor(Math.random() * (100 - -100 + 1)) + -100
    // );

    // curveArr.push(vecA);
    // curveArr.push(vecB);

    curveArr.push(
      new THREE.Vector3(
        Math.floor(Math.random() * (100 - -100 + 1)) + -100,
        Math.floor(Math.random() * (100 - -100 + 1)) + -100,
        Math.floor(Math.random() * (100 - -100 + 1)) + -100
      )
    );
    curveArr.push(
      new THREE.Vector3(
        Math.floor(Math.random() * (100 - -100 + 1)) + -100,
        Math.floor(Math.random() * (100 - -100 + 1)) + -100,
        Math.floor(Math.random() * (100 - -100 + 1)) + -100
      )
    );

    console.log(curveArr);
    const curve = new THREE.CatmullRomCurve3(curveArr);

    curvePoints = curve.getPoints(arrLength - 1);
    // console.log(curvePoints);
    // console.log(positions.length);

    curvePoints.forEach((element) => {
      positions[indx++] = element.x;
      positions[indx++] = element.y;
      positions[indx++] = element.z;
    });
    indx = 0;

    // for (let index = 0; index < positions.length; index++) {
    //   positions[index] = Math.floor(Math.random() * (100 - -100 + 1)) + -100;
    // }

    // console.log(positions);

    myLine.geometry.setPositions(positions);
    myLine.geometry.instanceCount;
  }

  renderer.render(scene, camera);
}
