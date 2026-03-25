import * as THREE from 'three';

export class CommunityScene {
  constructor(sceneManager) {
    this.sm = sceneManager;
    this.scene = sceneManager.scene;
    this._buildScene();
  }

  _buildScene() {
    this._addSky();
    this._addLights();
    this._addGround();
    this._addRoads();
    this._addBuildings();
    this._addTrees();
    this._addClouds();
    this._addDetails();
    this._addWalkingPeople();
    this._addMovingVehicles();
    this._addBirds();
  }

  /* ── Sky ── */
  _addSky() {
    const skyGeo = new THREE.SphereGeometry(200, 32, 16);
    const skyMat = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
    });

    // Create gradient texture
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#1a73e8');
    gradient.addColorStop(0.3, '#64b5f6');
    gradient.addColorStop(0.6, '#90caf9');
    gradient.addColorStop(1, '#e3f2fd');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2, 256);
    skyMat.map = new THREE.CanvasTexture(canvas);

    const sky = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(sky);

    // Sun
    const sunGeo = new THREE.SphereGeometry(4, 16, 16);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffee58 });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.position.set(40, 60, -60);
    this.scene.add(sun);

    // Sun glow
    const glowGeo = new THREE.SphereGeometry(6, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffee58,
      transparent: true,
      opacity: 0.2,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.copy(sun.position);
    this.scene.add(glow);
  }

  /* ── Lights ── */
  _addLights() {
    const ambient = new THREE.AmbientLight(0xb0d4f1, 0.7);
    this.scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xfff4e6, 1.2);
    dir.position.set(30, 40, 20);
    dir.castShadow = true;
    dir.shadow.mapSize.width = 2048;
    dir.shadow.mapSize.height = 2048;
    dir.shadow.camera.near = 0.5;
    dir.shadow.camera.far = 100;
    dir.shadow.camera.left = -40;
    dir.shadow.camera.right = 40;
    dir.shadow.camera.top = 40;
    dir.shadow.camera.bottom = -40;
    this.scene.add(dir);

    const hemi = new THREE.HemisphereLight(0x87ceeb, 0x7ec850, 0.4);
    this.scene.add(hemi);
  }

  /* ── Ground ── */
  _addGround() {
    const groundGeo = new THREE.PlaneGeometry(140, 140);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0x7ec850 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Grass variation patches
    const patchColors = [0x66bb6a, 0x81c784, 0x6abf69, 0x72c472];
    for (let i = 0; i < 12; i++) {
      const size = 4 + Math.random() * 8;
      const patchGeo = new THREE.CircleGeometry(size, 16);
      const patchMat = new THREE.MeshLambertMaterial({ color: patchColors[i % patchColors.length] });
      const patch = new THREE.Mesh(patchGeo, patchMat);
      patch.rotation.x = -Math.PI / 2;
      patch.position.set(
        -30 + Math.random() * 60,
        0.015,
        -30 + Math.random() * 60
      );
      this.scene.add(patch);
    }

    // Park area with path
    const parkGeo = new THREE.CircleGeometry(7, 32);
    const parkMat = new THREE.MeshLambertMaterial({ color: 0x4caf50 });
    const park = new THREE.Mesh(parkGeo, parkMat);
    park.rotation.x = -Math.PI / 2;
    park.position.set(15, 0.02, 12);
    this.scene.add(park);

    // Pond in park
    const pondGeo = new THREE.CircleGeometry(2.5, 24);
    const pondMat = new THREE.MeshLambertMaterial({ color: 0x4fc3f7 });
    const pond = new THREE.Mesh(pondGeo, pondMat);
    pond.rotation.x = -Math.PI / 2;
    pond.position.set(15, 0.04, 13);
    this.scene.add(pond);

    // Pond rim
    const rimGeo = new THREE.RingGeometry(2.5, 2.8, 24);
    const rimMat = new THREE.MeshLambertMaterial({ color: 0x8d6e63, side: THREE.DoubleSide });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = -Math.PI / 2;
    rim.position.set(15, 0.05, 13);
    this.scene.add(rim);
  }

  /* ── Roads ── */
  _addRoads() {
    const roadMat = new THREE.MeshLambertMaterial({ color: 0x555555 });
    const sidewalkMat = new THREE.MeshLambertMaterial({ color: 0xbdbdbd });
    const crossMat = new THREE.MeshLambertMaterial({ color: 0xeeeeee });

    // Main horizontal road
    const road1 = new THREE.Mesh(new THREE.PlaneGeometry(140, 5), roadMat);
    road1.rotation.x = -Math.PI / 2;
    road1.position.set(0, 0.03, 0);
    this.scene.add(road1);

    // Main vertical road
    const road2 = new THREE.Mesh(new THREE.PlaneGeometry(5, 140), roadMat);
    road2.rotation.x = -Math.PI / 2;
    road2.position.set(0, 0.03, 0);
    this.scene.add(road2);

    // Sidewalks along horizontal road
    for (const zOff of [-3.2, 3.2]) {
      const sw = new THREE.Mesh(new THREE.PlaneGeometry(140, 1), sidewalkMat);
      sw.rotation.x = -Math.PI / 2;
      sw.position.set(0, 0.04, zOff);
      this.scene.add(sw);
    }
    // Sidewalks along vertical road
    for (const xOff of [-3.2, 3.2]) {
      const sw = new THREE.Mesh(new THREE.PlaneGeometry(1, 140), sidewalkMat);
      sw.rotation.x = -Math.PI / 2;
      sw.position.set(xOff, 0.04, 0);
      this.scene.add(sw);
    }

    // Crosswalks at intersection
    for (let i = -2; i <= 2; i++) {
      // Horizontal crosswalks (north & south of intersection)
      for (const zOff of [-4, 4]) {
        const cw = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.8), crossMat);
        cw.rotation.x = -Math.PI / 2;
        cw.position.set(i * 1.2, 0.06, zOff);
        this.scene.add(cw);
      }
      // Vertical crosswalks (east & west)
      for (const xOff of [-4, 4]) {
        const cw = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.6), crossMat);
        cw.rotation.x = -Math.PI / 2;
        cw.position.set(xOff, 0.06, i * 1.2);
        this.scene.add(cw);
      }
    }

    // Road markings (dashed center lines)
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xffee58 });
    for (let i = -32; i <= 32; i += 4) {
      if (Math.abs(i) < 4) continue; // Skip intersection
      const dashH = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.15), dashMat);
      dashH.rotation.x = -Math.PI / 2;
      dashH.position.set(i, 0.05, 0);
      this.scene.add(dashH);

      const dashV = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 1.5), dashMat);
      dashV.rotation.x = -Math.PI / 2;
      dashV.position.set(0, 0.05, i);
      this.scene.add(dashV);
    }

    // Edge lines (white)
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (const zOff of [-2.3, 2.3]) {
      for (let i = -32; i <= 32; i += 2) {
        if (Math.abs(i) < 4) continue;
        const edge = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.1), edgeMat);
        edge.rotation.x = -Math.PI / 2;
        edge.position.set(i, 0.055, zOff);
        this.scene.add(edge);
      }
    }
  }

  /* ── Buildings ── */
  _addBuildings() {
    // All buildings placed in quadrants, well clear of roads (roads at x=0, z=0)
    // Top-left quadrant (negative x, negative z)
    this._buildHospital(-14, -14);
    this._buildPoliceStation(-14, -6);
    // Top-right quadrant (positive x, negative z)
    this._buildFireStation(14, -14);
    this._buildShop(14, -6);
    // Bottom-left quadrant (negative x, positive z)
    this._buildSchool(-14, 10);
    // Bottom-right quadrant (positive x, positive z) - houses spread out
    this._buildHouses(14, 10);
  }

  _buildHospital(x, z) {
    const group = new THREE.Group();

    // Main building
    const body = this._box(5, 5, 4, 0xffffff);
    body.position.y = 2.5;
    group.add(body);

    // Red cross
    const crossH = this._box(2, 0.4, 0.1, 0xe53935);
    crossH.position.set(0, 4, 2.01);
    group.add(crossH);
    const crossV = this._box(0.4, 2, 0.1, 0xe53935);
    crossV.position.set(0, 4, 2.01);
    group.add(crossV);

    // Roof
    const roof = this._box(5.4, 0.3, 4.4, 0xef5350);
    roof.position.y = 5.15;
    group.add(roof);

    // Door
    const door = this._box(1, 1.8, 0.1, 0x42a5f5);
    door.position.set(0, 0.9, 2.05);
    group.add(door);

    group.position.set(x, 0, z);
    group.castShadow = true;
    this.scene.add(group);
  }

  _buildFireStation(x, z) {
    const group = new THREE.Group();

    // Main building
    const body = this._box(6, 4.5, 5, 0xd32f2f);
    body.position.y = 2.25;
    group.add(body);

    // Garage door
    const garageDoor = this._box(3, 3, 0.1, 0xbdbdbd);
    garageDoor.position.set(0, 1.5, 2.55);
    group.add(garageDoor);

    // Roof
    const roof = this._box(6.4, 0.3, 5.4, 0xb71c1c);
    roof.position.y = 4.65;
    group.add(roof);

    // Tower
    const tower = this._box(1.5, 3, 1.5, 0xd32f2f);
    tower.position.set(2, 6, -1);
    group.add(tower);
    const towerRoof = this._box(1.8, 0.3, 1.8, 0xb71c1c);
    towerRoof.position.set(2, 7.65, -1);
    group.add(towerRoof);

    group.position.set(x, 0, z);
    group.castShadow = true;
    this.scene.add(group);
  }

  _buildSchool(x, z) {
    const group = new THREE.Group();

    const body = this._box(7, 4, 5, 0xfff9c4);
    body.position.y = 2;
    group.add(body);

    // Door
    const door = this._box(1.2, 2.2, 0.1, 0x795548);
    door.position.set(0, 1.1, 2.55);
    group.add(door);

    // Windows
    for (let i = -2; i <= 2; i += 2) {
      if (i === 0) continue;
      const win = this._box(0.8, 1, 0.1, 0x64b5f6);
      win.position.set(i, 2.8, 2.55);
      group.add(win);
    }

    // Roof
    const roofGeo = new THREE.ConeGeometry(5.5, 2, 4);
    const roofMat = new THREE.MeshLambertMaterial({ color: 0xff7043 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 5;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    // Flag
    const pole = this._box(0.1, 3, 0.1, 0x9e9e9e);
    pole.position.set(3, 4.5, 0);
    group.add(pole);
    const flag = this._box(1.2, 0.7, 0.05, 0x42a5f5);
    flag.position.set(3.7, 5.6, 0);
    group.add(flag);

    group.position.set(x, 0, z);
    group.castShadow = true;
    this.scene.add(group);
  }

  _buildHouses(x, z) {
    const colors = [0xffab91, 0xce93d8, 0x80cbc4];
    for (let i = 0; i < 3; i++) {
      const hGroup = new THREE.Group();
      const body = this._box(3, 2.5, 3, colors[i]);
      body.position.y = 1.25;
      hGroup.add(body);

      const roofGeo = new THREE.ConeGeometry(2.5, 1.5, 4);
      const roofMat = new THREE.MeshLambertMaterial({ color: 0x8d6e63 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = 3.25;
      roof.rotation.y = Math.PI / 4;
      hGroup.add(roof);

      const door = this._box(0.6, 1.3, 0.1, 0x795548);
      door.position.set(0, 0.65, 1.55);
      hGroup.add(door);

      hGroup.position.set(x + (i - 1) * 4.5, 0, z);
      hGroup.castShadow = true;
      this.scene.add(hGroup);
    }
  }

  _buildPoliceStation(x, z) {
    const group = new THREE.Group();

    const body = this._box(5, 4, 4, 0x1565c0);
    body.position.y = 2;
    group.add(body);

    // Badge (shield shape - simplified as triangle + rectangle)
    const badge = this._box(1.2, 1.2, 0.1, 0xffd54f);
    badge.position.set(0, 3.5, 2.05);
    group.add(badge);

    const roof = this._box(5.4, 0.3, 4.4, 0x0d47a1);
    roof.position.y = 4.15;
    group.add(roof);

    const door = this._box(1.2, 2, 0.1, 0x90caf9);
    door.position.set(0, 1, 2.05);
    group.add(door);

    group.position.set(x, 0, z);
    group.castShadow = true;
    this.scene.add(group);
  }

  _buildShop(x, z) {
    const group = new THREE.Group();

    const body = this._box(4, 3, 3.5, 0xfff176);
    body.position.y = 1.5;
    group.add(body);

    // Awning
    const awningGeo = new THREE.PlaneGeometry(4.5, 1.5);
    const awningMat = new THREE.MeshLambertMaterial({
      color: 0xff7043,
      side: THREE.DoubleSide,
    });
    const awning = new THREE.Mesh(awningGeo, awningMat);
    awning.position.set(0, 2.8, 2.2);
    awning.rotation.x = -0.3;
    group.add(awning);

    const door = this._box(1, 1.8, 0.1, 0x8d6e63);
    door.position.set(0, 0.9, 1.8);
    group.add(door);

    const roof = this._box(4.4, 0.2, 3.9, 0xf57c00);
    roof.position.y = 3.1;
    group.add(roof);

    group.position.set(x, 0, z);
    group.castShadow = true;
    this.scene.add(group);
  }

  /* ── Trees ── */
  _addTrees() {
    // Positions carefully chosen to avoid overlapping buildings
    const treePositions = [
      [-5, 6], [-2, 9], [3, 7], [6, 9],
      [-7, -4], [7, -4], [-7, 4], [7, 4],
      [-28, -8], [28, -8], [-28, 8], [28, 8],
      [-8, -22], [8, -22], [0, 22],
      [-26, 14], [26, -14], [-4, -20], [12, 22],
    ];

    for (const [x, z] of treePositions) {
      this._addTree(x, z, 1 + Math.random() * 0.5);
    }
  }

  _addTree(x, z, scale) {
    const group = new THREE.Group();

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.3, 1.5, 6);
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x795548 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0.75;
    group.add(trunk);

    // Foliage (stacked cones for low-poly look)
    const foliageMat = new THREE.MeshLambertMaterial({ color: 0x43a047 });
    for (let i = 0; i < 3; i++) {
      const size = 1.4 - i * 0.3;
      const geo = new THREE.ConeGeometry(size, 1.2, 6);
      const cone = new THREE.Mesh(geo, foliageMat);
      cone.position.y = 1.8 + i * 0.8;
      cone.castShadow = true;
      group.add(cone);
    }

    group.scale.setScalar(scale);
    group.position.set(x, 0, z);

    // Gentle sway animation
    group.userData.animate = (elapsed) => {
      group.rotation.z = Math.sin(elapsed * 0.5 + x) * 0.02;
    };
    this.sm.animatedObjects.push(group);

    this.scene.add(group);
  }

  /* ── Clouds ── */
  _addClouds() {
    for (let i = 0; i < 8; i++) {
      const cloud = this._makeCloud();
      cloud.position.set(
        -50 + Math.random() * 100,
        25 + Math.random() * 15,
        -40 + Math.random() * 30
      );
      cloud.scale.setScalar(0.8 + Math.random() * 1.2);

      const speed = 0.5 + Math.random() * 1;
      cloud.userData.animate = (elapsed) => {
        cloud.position.x += speed * 0.01;
        if (cloud.position.x > 60) cloud.position.x = -60;
      };
      this.sm.animatedObjects.push(cloud);
      this.scene.add(cloud);
    }
  }

  _makeCloud() {
    const group = new THREE.Group();
    const mat = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });

    const puffs = [
      { r: 1.5, x: 0, y: 0, z: 0 },
      { r: 1.2, x: 1.5, y: -0.2, z: 0.3 },
      { r: 1.1, x: -1.4, y: -0.1, z: -0.2 },
      { r: 0.9, x: 0.8, y: 0.5, z: -0.2 },
      { r: 1.0, x: -0.7, y: 0.4, z: 0.2 },
    ];

    for (const p of puffs) {
      const geo = new THREE.SphereGeometry(p.r, 8, 6);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(p.x, p.y, p.z);
      group.add(mesh);
    }

    return group;
  }

  /* ── Details (benches, lamp posts) ── */
  _addDetails() {
    // Park benches
    const benchPositions = [
      [-2, 6, 0], [2, 6, Math.PI],
      [0, 10, Math.PI / 2],
    ];
    for (const [x, z, rot] of benchPositions) {
      this._addBench(x, z, rot);
    }

    // Lamp posts along road
    const lampPositions = [
      [-8, 2.5], [-8, -2.5], [8, 2.5], [8, -2.5],
      [2.5, -8], [-2.5, -8], [2.5, 8], [-2.5, 8],
    ];
    for (const [x, z] of lampPositions) {
      this._addLampPost(x, z);
    }

    // Playground elements in park
    this._addPlayground(0, 8);
  }

  _addBench(x, z, rot) {
    const group = new THREE.Group();
    const seatMat = new THREE.MeshLambertMaterial({ color: 0x8d6e63 });
    const legMat = new THREE.MeshLambertMaterial({ color: 0x5d4037 });

    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 0.5), seatMat);
    seat.position.y = 0.4;
    group.add(seat);

    const back = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 0.08), seatMat);
    back.position.set(0, 0.65, -0.2);
    group.add(back);

    for (let lx of [-0.6, 0.6]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.4), legMat);
      leg.position.set(lx, 0.2, 0);
      group.add(leg);
    }

    group.position.set(x, 0, z);
    group.rotation.y = rot;
    this.scene.add(group);
  }

  _addLampPost(x, z) {
    const group = new THREE.Group();
    const poleMat = new THREE.MeshLambertMaterial({ color: 0x616161 });

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 3, 6), poleMat);
    pole.position.y = 1.5;
    group.add(pole);

    const light = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xfff9c4 })
    );
    light.position.y = 3.1;
    group.add(light);

    group.position.set(x, 0, z);
    this.scene.add(group);
  }

  _addPlayground(x, z) {
    const group = new THREE.Group();

    // Slide
    const slideBase = this._box(0.8, 2, 0.8, 0xff7043);
    slideBase.position.set(-1.5, 1, 0);
    group.add(slideBase);

    const slideSurface = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 2.5),
      new THREE.MeshLambertMaterial({ color: 0xffc107, side: THREE.DoubleSide })
    );
    slideSurface.position.set(-1.5, 1, 0.8);
    slideSurface.rotation.x = 0.5;
    group.add(slideSurface);

    // Swing frame
    const frameMat = new THREE.MeshLambertMaterial({ color: 0x42a5f5 });
    const barTop = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3, 6), frameMat);
    barTop.rotation.z = Math.PI / 2;
    barTop.position.set(2, 2.5, 0);
    group.add(barTop);

    for (let sx of [0.8, 3.2]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.5, 6), frameMat);
      leg.position.set(sx, 1.25, 0);
      group.add(leg);
    }

    group.position.set(x, 0, z);
    this.scene.add(group);
  }

  /* ── Helper ── */
  _box(w, h, d, color) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    return mesh;
  }

  /* ── Walking People ── */
  _addWalkingPeople() {
    const people = [
      { color: 0xffffff, hat: 0xe53935, x: -14, z: -10, dir: 'z', speed: 1.2, range: 6 },  // Doctor near hospital
      { color: 0xffcc02, hat: 0xd32f2f, x: 14, z: -10, dir: 'z', speed: 1.0, range: 6 },   // Firefighter near station
      { color: 0x1565c0, hat: 0x0d47a1, x: -10, z: -6, dir: 'x', speed: 0.8, range: 6 },   // Police near station
      { color: 0xff7043, hat: null, x: -10, z: 10, dir: 'x', speed: 0.9, range: 6 },         // Kid near school
      { color: 0xce93d8, hat: null, x: 10, z: 10, dir: 'x', speed: 1.1, range: 6 },          // Kid near houses
      { color: 0x80cbc4, hat: null, x: 10, z: -6, dir: 'z', speed: 0.7, range: 5 },          // Shopper near shop
    ];

    for (const p of people) {
      const person = this._makePerson(p.color, p.hat);
      person.position.set(p.x, 0, p.z);
      const startX = p.x, startZ = p.z;

      person.userData.animate = (elapsed) => {
        // Walk back and forth
        const t = Math.sin(elapsed * p.speed * 0.4) * p.range * 0.5;
        if (p.dir === 'x') {
          person.position.x = startX + t;
          person.rotation.y = Math.cos(elapsed * p.speed * 0.4) > 0 ? Math.PI / 2 : -Math.PI / 2;
        } else {
          person.position.z = startZ + t;
          person.rotation.y = Math.cos(elapsed * p.speed * 0.4) > 0 ? 0 : Math.PI;
        }
        // Bob up and down while walking
        person.position.y = Math.abs(Math.sin(elapsed * p.speed * 2)) * 0.15;
      };

      this.sm.animatedObjects.push(person);
      this.scene.add(person);
    }
  }

  _makePerson(bodyColor, hatColor) {
    const group = new THREE.Group();

    // Legs
    const legMat = new THREE.MeshLambertMaterial({ color: 0x424242 });
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.2), legMat);
    leftLeg.position.set(-0.12, 0.3, 0);
    group.add(leftLeg);
    const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.2), legMat);
    rightLeg.position.set(0.12, 0.3, 0);
    group.add(rightLeg);

    // Body
    const bodyMat = new THREE.MeshLambertMaterial({ color: bodyColor });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.3), bodyMat);
    body.position.y = 0.95;
    group.add(body);

    // Head
    const headMat = new THREE.MeshLambertMaterial({ color: 0xffcc80 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), headMat);
    head.position.y = 1.5;
    group.add(head);

    // Hat (optional)
    if (hatColor) {
      const hat = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.25, 0.15, 8),
        new THREE.MeshLambertMaterial({ color: hatColor })
      );
      hat.position.y = 1.72;
      group.add(hat);
    }

    // Arms
    const armMat = new THREE.MeshLambertMaterial({ color: bodyColor });
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.5, 0.15), armMat);
    leftArm.position.set(-0.35, 0.85, 0);
    group.add(leftArm);
    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.5, 0.15), armMat);
    rightArm.position.set(0.35, 0.85, 0);
    group.add(rightArm);

    group.scale.setScalar(1.2);
    return group;
  }

  /* ── Moving Vehicles ── */
  _addMovingVehicles() {
    // Ambulance on horizontal road (moves along x-axis)
    const ambulance = this._makeVehicle(0xffffff, 0xe53935, true);
    ambulance.position.set(-28, 0.3, -1.5);
    ambulance.userData.animate = (elapsed) => {
      const t = Math.sin(elapsed * 0.4) * 28;
      ambulance.position.x = t;
      // Car front is +X local, so 0 = faces +X, PI = faces -X
      ambulance.rotation.y = Math.cos(elapsed * 0.4) > 0 ? 0 : Math.PI;
    };
    this.sm.animatedObjects.push(ambulance);
    this.scene.add(ambulance);

    // Fire truck on vertical road (moves along z-axis)
    const fireTruck = this._makeVehicle(0xd32f2f, 0xffcc02, false);
    fireTruck.position.set(-1.5, 0.3, -28);
    fireTruck.userData.animate = (elapsed) => {
      const t = Math.sin(elapsed * 0.3 + 2) * 28;
      fireTruck.position.z = t;
      // PI/2 = faces +Z, -PI/2 = faces -Z
      fireTruck.rotation.y = Math.cos(elapsed * 0.3 + 2) > 0 ? Math.PI / 2 : -Math.PI / 2;
    };
    this.sm.animatedObjects.push(fireTruck);
    this.scene.add(fireTruck);

    // Small car on horizontal road (moves along x-axis, opposite lane)
    const car = this._makeVehicle(0x42a5f5, 0x1565c0, false);
    car.scale.setScalar(0.7);
    car.position.set(28, 0.3, 1.5);
    car.userData.animate = (elapsed) => {
      const t = Math.sin(elapsed * 0.5 + 4) * 28;
      car.position.x = t;
      // 0 = faces +X, PI = faces -X
      car.rotation.y = Math.cos(elapsed * 0.5 + 4) > 0 ? 0 : Math.PI;
    };
    this.sm.animatedObjects.push(car);
    this.scene.add(car);
  }

  _makeVehicle(bodyColor, accentColor, hasLight) {
    const group = new THREE.Group();

    // Body
    const body = this._box(2.4, 1, 1.2, bodyColor);
    body.position.y = 0.7;
    group.add(body);

    // Cabin (windshield area)
    const cabin = this._box(1.2, 0.7, 1.1, accentColor);
    cabin.position.set(-0.3, 1.55, 0);
    group.add(cabin);

    // Bumpers
    const bumperMat = new THREE.MeshLambertMaterial({ color: 0x9e9e9e });
    const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 1.3), bumperMat);
    frontBumper.position.set(1.27, 0.35, 0);
    group.add(frontBumper);
    const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 1.3), bumperMat);
    rearBumper.position.set(-1.27, 0.35, 0);
    group.add(rearBumper);

    // Wheels
    const wheelMat = new THREE.MeshLambertMaterial({ color: 0x212121 });
    const wheelGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.18, 12);
    const hubMat = new THREE.MeshLambertMaterial({ color: 0x9e9e9e });
    const hubGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 8);
    const wheelPositions = [[-0.7, 0.28, 0.68], [0.7, 0.28, 0.68], [-0.7, 0.28, -0.68], [0.7, 0.28, -0.68]];
    for (const [wx, wy, wz] of wheelPositions) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(wx, wy, wz);
      group.add(wheel);
      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.rotation.x = Math.PI / 2;
      hub.position.set(wx, wy, wz);
      group.add(hub);
    }

    // Flashing light on top (for emergency vehicles)
    if (hasLight) {
      const lightBase = this._box(0.5, 0.12, 0.3, 0x9e9e9e);
      lightBase.position.set(0.2, 1.96, 0);
      group.add(lightBase);

      const redLight = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
      );
      redLight.position.set(0.35, 2.1, 0);
      group.add(redLight);

      const blueLight = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x2196f3 })
      );
      blueLight.position.set(0.05, 2.1, 0);
      group.add(blueLight);

      // Alternate flashing
      group.userData.animate = (elapsed) => {
        const flash = Math.sin(elapsed * 6) > 0;
        redLight.material.opacity = flash ? 1 : 0.2;
        blueLight.material.opacity = flash ? 0.2 : 1;
      };
      this.sm.animatedObjects.push(group);
    }

    return group;
  }

  /* ── Birds ── */
  _addBirds() {
    for (let i = 0; i < 5; i++) {
      const bird = this._makeBird();
      const radius = 15 + Math.random() * 20;
      const height = 15 + Math.random() * 10;
      const speed = 0.3 + Math.random() * 0.4;
      const offset = Math.random() * Math.PI * 2;

      bird.userData.animate = (elapsed) => {
        const angle = elapsed * speed + offset;
        bird.position.x = Math.cos(angle) * radius;
        bird.position.z = Math.sin(angle) * radius;
        bird.position.y = height + Math.sin(elapsed * 1.5 + offset) * 2;
        bird.rotation.y = -angle + Math.PI / 2;

        // Wing flap - access the wing pivots
        const leftPivot = bird.userData.leftWing;
        const rightPivot = bird.userData.rightWing;
        if (leftPivot) leftPivot.rotation.z = Math.sin(elapsed * 6 + offset) * 0.5;
        if (rightPivot) rightPivot.rotation.z = -Math.sin(elapsed * 6 + offset) * 0.5;
      };

      this.sm.animatedObjects.push(bird);
      this.scene.add(bird);
    }
  }

  _makeBird() {
    const group = new THREE.Group();
    const bodyColor = new THREE.MeshLambertMaterial({ color: 0x37474f });
    const wingColor = new THREE.MeshLambertMaterial({ color: 0x546e7a, side: THREE.DoubleSide });
    const beakColor = new THREE.MeshLambertMaterial({ color: 0xff8f00 });
    const tailColor = new THREE.MeshLambertMaterial({ color: 0x455a64 });

    // Body (elongated ellipsoid)
    const bodyGeo = new THREE.SphereGeometry(0.25, 8, 6);
    bodyGeo.scale(1, 0.6, 0.5);
    const body = new THREE.Mesh(bodyGeo, bodyColor);
    group.add(body);

    // Head
    const headGeo = new THREE.SphereGeometry(0.15, 8, 6);
    const head = new THREE.Mesh(headGeo, bodyColor);
    head.position.set(0.22, 0.08, 0);
    group.add(head);

    // Beak (cone)
    const beakGeo = new THREE.ConeGeometry(0.05, 0.15, 4);
    const beak = new THREE.Mesh(beakGeo, beakColor);
    beak.rotation.z = -Math.PI / 2;
    beak.position.set(0.4, 0.06, 0);
    group.add(beak);

    // Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eyeGeo = new THREE.SphereGeometry(0.025, 6, 6);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(0.3, 0.14, 0.08);
    group.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.3, 0.14, -0.08);
    group.add(rightEye);

    // Tail (flat triangle shape)
    const tailGeo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -0.25, 0, 0,
      -0.5, 0.05, 0.1,
      -0.5, 0.05, -0.1,
    ]);
    tailGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    tailGeo.computeVertexNormals();
    const tail = new THREE.Mesh(tailGeo, tailColor);
    group.add(tail);

    // Left wing (pivot-based for proper flapping)
    const leftWingPivot = new THREE.Group();
    leftWingPivot.position.set(0, 0, 0.12);
    const leftWingGeo = new THREE.BufferGeometry();
    const lwVerts = new Float32Array([
      0.1, 0, 0,
      -0.1, 0, 0,
      -0.05, 0, 0.35,
    ]);
    leftWingGeo.setAttribute('position', new THREE.BufferAttribute(lwVerts, 3));
    leftWingGeo.computeVertexNormals();
    const leftWing = new THREE.Mesh(leftWingGeo, wingColor);
    leftWingPivot.add(leftWing);
    group.add(leftWingPivot);
    group.userData.leftWing = leftWingPivot;

    // Right wing (mirror)
    const rightWingPivot = new THREE.Group();
    rightWingPivot.position.set(0, 0, -0.12);
    const rightWingGeo = new THREE.BufferGeometry();
    const rwVerts = new Float32Array([
      0.1, 0, 0,
      -0.1, 0, 0,
      -0.05, 0, -0.35,
    ]);
    rightWingGeo.setAttribute('position', new THREE.BufferAttribute(rwVerts, 3));
    rightWingGeo.computeVertexNormals();
    const rightWing = new THREE.Mesh(rightWingGeo, wingColor);
    rightWingPivot.add(rightWing);
    group.add(rightWingPivot);
    group.userData.rightWing = rightWingPivot;

    group.scale.setScalar(2.5);
    return group;
  }
}
