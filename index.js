import { FBXLoader } from "./js/fbxloader.js";
import { Scene } from "./js/three.module.js";
let camera, scene, renderer, hemilight, spotlight, directional, delta, ambient;
init();
animate();
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const canvas = document.querySelector("canvas.webgl");
/* -------------------------------- controls -------------------------------- */
function init() {
  /* -------------------------------- geometry -------------------------------- */
  scene = new THREE.Scene();
  scene.add(new THREE.AxesHelper(500));
  /* --------------------------------- camera --------------------------------- */
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100);

  /* -------------------------------- Car model -------------------------------- */
  // const geometry = new THREE.BoxGeometry(10, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe:true });
  
  // const cubeA = new THREE.Mesh(geometry, material);
  // cubeA.position.set(30,0,0)
  // const cubeB = new THREE.Mesh(geometry, material);
  // const group = new THREE.Group();
  // group.add(cubeA);
  // group.add(cubeB);
  // scene.add(group);
  const lod = new THREE.LOD();

//Create spheres with 3 levels of detail and create new LOD levels for them
for( let i = 0; i < 3; i++ ) {

	const geometry = new THREE.IcosahedronGeometry( 10,2 - i )

	const mesh = new THREE.Mesh( geometry, material );

	lod.addLevel( mesh, i * 75 );
   
}

scene.add( lod );
  /* -------------------------------- Lighting -------------------------------- */
  ambient = new THREE.HemisphereLight(0xffffff, 0xfff000, 3);
  scene.add(ambient);
  /* --------------------------------- render --------------------------------- */
  renderer = new THREE.WebGL1Renderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
}
/* --------------------------------- animate -------------------------------- */

function animate() {
  delta += 0.01;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
