import * as THREE from "three";
// @ts-ignore
import * as TWEEN from "@tweenjs/tween.js";
// @ts-ignore
import Stats from "stats.js";

export class LoveScene {
  [x: string]: any;

  constructor() {
    this.numHearts = 1000;
    this.colors = {
      red: 0xffdbdb,
      choco: 0xff7878,
    };
    this.extrudeSettings = {
      amount: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 20,
      bevelThickness: 20,
    };

    this.mouseX = 0;
    this.mouseY = 0;

    this.isTweening = false;

    this.init();
  }

  init() {
    this.setup();
    this.makeLove();
    this.bindEvents();
    this.animate();
  }

  setup() {
    // renderer --------------
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    // scene --------------
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.colors.red);
    this.scene.fog = new THREE.FogExp2(this.colors.red, 0.002);

    // camera -------------------
    let fieldOfView = 60,
      aspect = window.innerWidth / window.innerHeight,
      nearPlane = 1,
      farPlane = 1000;

    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspect,
      nearPlane,
      farPlane
    );
    this.camera.position.x = 2000;
    this.camera.position.y = 2000;
    this.camera.position.z = 2000;
    this.camera.lookAt(new THREE.Vector3());

    // controls --------------------
    // this.controls = new OrbitControls(this.camera);
    // this.controls.enablePan = false;
    // this.controls.autoRotate = true;
    // this.controls.autoRotateSpeed = 0.1;
    // this.controls.enableDamping = true;
    // this.controls.enableZoom = false;

    // stats -----------------------
    // this.stats = new Stats();
    // document.body.appendChild(this.stats.domElement);
  }

  appearScene() {
    this.renderer.domElement.style.opacity = 1;
  }

  makeLove() {
    this.makeHeartsAtmosphere();
    this.makeLights();
    this.makeTweenEntry();
  }

  makeHeartsAtmosphere() {
    let atmosphere = new THREE.Object3D();
    this.scene.add(atmosphere);

    let heartShape = new THREE.Shape();
    heartShape.moveTo(25, 25);
    heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
    heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
    heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
    heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
    heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
    heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

    let geometry = new THREE.ExtrudeGeometry(heartShape, this.extrudeSettings);

    let material = new THREE.MeshLambertMaterial({
      color: this.colors.choco,
      // flatShading: true,
    });

    // make atmosphere
    for (let i = 0; i < this.numHearts; i++) {
      let heart = new THREE.Mesh(geometry, material);

      heart.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000
      );

      heart.scale.set(0.5, 0.5, 0.5);

      heart.rotation.x = Math.PI;
      heart.rotation.y = Math.random() * Math.PI;

      atmosphere.add(heart);
    }
  }

  makeLights() {
    let light1 = new THREE.DirectionalLight(0xffffff);
    light1.position.set(1, 1, 1);
    this.scene.add(light1);

    let light2 = new THREE.DirectionalLight(0x002288);
    light2.position.set(-1, -1, -1);
    this.scene.add(light2);

    let ambient = new THREE.AmbientLight(this.colors.choco, 0.1);
    this.scene.add(ambient);
  }

  makeTweenEntry() {
    this.isTweening = true;
    this.appearScene();

    new TWEEN.Tween(this.camera.position)
      .to({ x: 0, y: 0, z: 100 }, 8000)
      .easing(TWEEN.Easing.Quintic.Out)
      .delay(2000)
      .onComplete(() => (this.isTweening = false))
      .start();
  }

  animate() {
    this.renderer.render(this.scene, this.camera);

    // this.stats.begin();

    TWEEN.update();
    // this.controls.update();

    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.01;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.01;
    this.camera.lookAt(this.scene.position);

    // this.stats.end();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  bindEvents() {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    document.addEventListener(
      "mousemove",
      this.onDocumentMouseMove.bind(this),
      false
    );
  }

  onWindowResize() {
    let width = window.innerWidth,
      height = window.innerHeight;

    this.renderer.setSize(width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  onDocumentMouseMove(event: any) {
    if (this.isTweening) return;

    this.mouseX = event.clientX - window.innerWidth / 2;
    this.mouseY = event.clientY - window.innerHeight / 2;
  }
}

// new LoveScene();
