import * as THREE from 'three';

export class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 12, 28);
    this.camera.lookAt(0, 2, 0);

    // Camera positions for each chapter
    this.cameraTargets = {
      '1-1': { pos: { x: 0, y: 14, z: 30 }, lookAt: { x: 0, y: 2, z: 0 } },
      '1-2': { pos: { x: -12, y: 10, z: 22 }, lookAt: { x: -8, y: 2, z: -2 } },
      '1-3': { pos: { x: 10, y: 12, z: 20 }, lookAt: { x: 6, y: 1, z: -4 } },
      '2-1': { pos: { x: -6, y: 16, z: 26 }, lookAt: { x: -4, y: 2, z: 0 } },
      '2-activity': { pos: { x: 0, y: 22, z: 24 }, lookAt: { x: 0, y: 0, z: 0 } },
      '2-2': { pos: { x: 8, y: 10, z: 24 }, lookAt: { x: 4, y: 3, z: -2 } },
      '2-3': { pos: { x: 0, y: 18, z: 32 }, lookAt: { x: 0, y: 0, z: 0 } },
    };

    // Transition state
    this._transitioning = false;
    this._transStart = null;
    this._transDuration = 1200;
    this._fromPos = new THREE.Vector3();
    this._toPos = new THREE.Vector3();
    this._fromLookAt = new THREE.Vector3();
    this._toLookAt = new THREE.Vector3();
    this._currentLookAt = new THREE.Vector3(0, 2, 0);

    // Resize
    window.addEventListener('resize', () => this._onResize());

    // Animation objects (populated by CommunityScene)
    this.animatedObjects = [];
  }

  _onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  transitionToChapter(chapterId) {
    const target = this.cameraTargets[chapterId];
    if (!target) return;

    this._fromPos.copy(this.camera.position);
    this._toPos.set(target.pos.x, target.pos.y, target.pos.z);
    this._fromLookAt.copy(this._currentLookAt);
    this._toLookAt.set(target.lookAt.x, target.lookAt.y, target.lookAt.z);
    this._transStart = performance.now();
    this._transitioning = true;
  }

  _easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  _updateTransition() {
    if (!this._transitioning) return;
    const elapsed = performance.now() - this._transStart;
    let t = Math.min(elapsed / this._transDuration, 1);
    t = this._easeInOutCubic(t);

    this.camera.position.lerpVectors(this._fromPos, this._toPos, t);
    this._currentLookAt.lerpVectors(this._fromLookAt, this._toLookAt, t);
    this.camera.lookAt(this._currentLookAt);

    if (t >= 1) {
      this._transitioning = false;
    }
  }

  start() {
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = this.clock.getDelta();
      const elapsed = this.clock.getElapsedTime();

      this._updateTransition();

      // Animate objects
      for (const obj of this.animatedObjects) {
        if (obj.userData.animate) {
          obj.userData.animate(elapsed, delta);
        }
      }

      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}
