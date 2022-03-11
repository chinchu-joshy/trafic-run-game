import { FBXLoader } from "./js/fbxloader.js";
import { Scene } from "./js/three.module.js";
let camera, scene, renderer, hemilight, spotlight, directional, delta, ambient;
init();

animate();
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const canvas = document.querySelector("canvas.webgl");

/* -------------------------------- controls -------------------------------- */
function init() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  const cameraWidth = 150;
  const cameraHeight = cameraWidth / aspectRatio;
  /* -------------------------------- scene -------------------------------- */
  scene = new THREE.Scene();
  const result = Car();
  const result_2=Lory()
  const result_3=Tree()
  scene.add(result);
  scene.add(result_2);
  scene.add(result_3);
  scene.add(new THREE.AxesHelper(500));
  /* --------------------------------- camera --------------------------------- */
  camera = new THREE.OrthographicCamera(
    cameraWidth / -2,
    cameraWidth / 2,
    cameraHeight / 2,
    cameraHeight / -2,
    0,
    1000
  );
  camera.position.set(200, -200, 300);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  /* -------------------------------- Lighting -------------------------------- */
  ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);
  directional = new THREE.DirectionalLight(0xffffff, 0.6);
  directional.position.set(0, -20, 30);
  scene.add(directional);
  /* --------------------------------- render --------------------------------- */
  renderer = new THREE.WebGL1Renderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
}
/* --------------------------------- animate -------------------------------- */
function Car() {
  const vehicleColors = [0xa52523, 0xbdb638, 0x78b14b];
  const car = new THREE.Group();
  const backWheel = new THREE.Mesh(
    new THREE.BoxGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({ color: 0x333333 })
  );
  backWheel.position.z = 6;
  backWheel.position.x = -18;
  car.add(backWheel);
  const frontWheel = new THREE.Mesh(
    new THREE.BoxGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({ color: 0x333333 })
  );
  frontWheel.position.z = 6;
  frontWheel.position.x = 18;
  car.add(frontWheel);
  const main = new THREE.Mesh(
    new THREE.BoxGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({ color: pickRandom(vehicleColors) })
  );
  main.position.y = 1;
  main.position.z = 10;
  car.add(main);
  const carFrontTexture=getCarFrontTexture()
  carFrontTexture.center=new THREE.Vector2(0.5,0.5)
  carFrontTexture.rotation=Math.PI/2

  const carBackTexture=getCarFrontTexture()
  carBackTexture.center=new THREE.Vector2(0.5,0.5)
  carBackTexture.rotation=Math.PI/-2
  const carRightSideTexture=getCarSideTexture()
  const carLeftSideTexture=getCarSideTexture()
  carLeftSideTexture.flipY=false
  const cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(32, 24, 12),[
      new THREE.MeshLambertMaterial({map:carFrontTexture }),
      new THREE.MeshLambertMaterial({map:carBackTexture }),
      new THREE.MeshLambertMaterial({map:carLeftSideTexture }),
      new THREE.MeshLambertMaterial({map:carRightSideTexture }),
      new THREE.MeshLambertMaterial({color:0xffffff}),
      new THREE.MeshLambertMaterial({color:0xffffff}),
    ]
   
  );
  cabin.position.z = 23;
  cabin.position.y = 1;
  car.add(cabin);
  return car;
}
function Lory(){
  const lory= new THREE.Group();
  const backWheel = new THREE.Mesh(
    new THREE.BoxGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({ color: 0x333333 })
  );
  backWheel.position.y = 60;
  backWheel.position.x = -28;
  lory.add(backWheel);
  const frontWheel = new THREE.Mesh(
    new THREE.BoxGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({ color: 0x333333 })
  );
  frontWheel.position.y = 60;
  frontWheel.position.x = 28;
  lory.add(frontWheel);
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(80, 30, 29),
    new THREE.MeshLambertMaterial({ color:0x6666ff })
  );
  back.position.y = 60;
  back.position.z = 10;
  lory.add(back);
  const extend = new THREE.Mesh(
    new THREE.BoxGeometry(10, 29, 10),
    new THREE.MeshLambertMaterial({ color:0xb3c6ff })
  );
  extend.position.y = 60;
  extend.position.x = 40;
  lory.add(extend);
  return lory
}
function Tree(){
  const tree= new THREE.Group();
  const wood = new THREE.Mesh(
    new THREE.BoxGeometry(18, 20, 10),
    new THREE.MeshLambertMaterial({ color: 0x333000 })
  );
  wood.position.z = 100;
  wood.position.x = -18;
  tree.add(wood);
  const top = new THREE.Mesh(
    new THREE.SphereGeometry(27, 50, 50),
    new THREE.MeshLambertMaterial({ color: 0x33cc33 })
  );
  top.position.z = 130;
  top.position.x = -18;
  tree.add(top);
  return tree
}
function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function animate() {
  delta += 0.01;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
/* ------------------- // drawing the texture for the car ------------------- */
function getCarFrontTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 32;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 64, 32);
  context.fillStyle = "#666666";
  context.fillRect(8, 8, 48, 24);
  return new THREE.CanvasTexture(canvas);
}
function getCarSideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 32;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 128, 32);
  context.fillStyle = "#666666";
  context.fillRect(10, 8, 38, 24);
  context.fillRect(58, 8, 60, 24);
  return new THREE.CanvasTexture(canvas);
}

