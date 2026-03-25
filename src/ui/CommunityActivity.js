import * as THREE from 'three';

/**
 * 3D Interactive Activity: "Help the Community!"
 * Kids click on buildings to dispatch the correct helper.
 * A scenario appears, and they must click the right building.
 */
export class CommunityActivity {
  constructor(sceneManager) {
    this.sm = sceneManager;
    this.scene = sceneManager.scene;
    this.camera = sceneManager.camera;
    this.renderer = sceneManager.renderer;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.scenarios = [
      {
        text: 'Oh no! There is a fire at the bakery! Which building should send help?',
        correct: 'firestation',
        feedback: 'Great job! The firefighters will put out the fire!',
        wrong: 'Hmm, that is not right. Try clicking on the Fire Station!'
      },
      {
        text: 'Little Meera has a high fever and needs medicine. Where should she go?',
        correct: 'hospital',
        feedback: 'Correct! The doctor at the hospital will help Meera feel better!',
        wrong: 'Not quite. Meera needs the Hospital! Click on it.'
      },
      {
        text: 'Someone stole a bicycle from the park. Who should we report this to?',
        correct: 'police',
        feedback: 'Well done! The police will find who took the bicycle!',
        wrong: 'That is not right. We need the Police Station for this!'
      },
      {
        text: 'The children want to learn about planets today. Where do they go?',
        correct: 'school',
        feedback: 'Perfect! The teacher at school will teach them all about planets!',
        wrong: 'Nope! The children should go to the School. Try again!'
      },
    ];

    this.currentScenario = 0;
    this.score = 0;
    this.active = false;
    this.clickableBuildings = {};
    this.highlightMeshes = [];

    this._onClickBound = this._onClick.bind(this);
    this._onMoveBound = this._onMouseMove.bind(this);
  }

  /** Create clickable highlight rings around buildings */
  _createClickTargets() {
    const buildingPositions = {
      hospital: { x: -14, z: -14, color: 0xe53935 },
      firestation: { x: 14, z: -14, color: 0xff6f00 },
      school: { x: -14, z: 10, color: 0x43a047 },
      police: { x: -14, z: -6, color: 0x1565c0 },
    };

    for (const [name, config] of Object.entries(buildingPositions)) {
      // Large invisible clickable sphere
      const clickGeo = new THREE.SphereGeometry(4, 16, 16);
      const clickMat = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0,
      });
      const clickMesh = new THREE.Mesh(clickGeo, clickMat);
      clickMesh.position.set(config.x, 3, config.z);
      clickMesh.userData.buildingName = name;
      this.scene.add(clickMesh);
      this.clickableBuildings[name] = clickMesh;

      // Glowing ring indicator
      const ringGeo = new THREE.RingGeometry(3.5, 4, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(config.x, 0.08, config.z);
      this.scene.add(ring);
      this.highlightMeshes.push(ring);

      // Pulsing animation
      ring.userData.animate = (elapsed) => {
        ring.scale.setScalar(1 + Math.sin(elapsed * 2) * 0.1);
        ringMat.opacity = 0.4 + Math.sin(elapsed * 3) * 0.2;
      };
      this.sm.animatedObjects.push(ring);

      // Floating label above building
      this._addLabel(name, config.x, 7, config.z, config.color);
    }
  }

  _addLabel(name, x, y, z, color) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = `rgba(0,0,0,0.5)`;
    ctx.roundRect(0, 0, 256, 64, 12);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const labels = {
      hospital: 'Hospital',
      firestation: 'Fire Station',
      school: 'School',
      police: 'Police Station',
    };
    ctx.fillText(labels[name] || name, 128, 32);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.set(x, y, z);
    sprite.scale.set(4, 1, 1);
    this.scene.add(sprite);
    this.highlightMeshes.push(sprite);

    // Bob up and down
    sprite.userData.animate = (elapsed) => {
      sprite.position.y = y + Math.sin(elapsed * 1.5) * 0.3;
    };
    this.sm.animatedObjects.push(sprite);
  }

  /** Start the activity */
  start() {
    this.active = true;
    this.currentScenario = 0;
    this.score = 0;

    // Move camera to overview
    this.sm.transitionToChapter('2-1');

    this._createClickTargets();

    // Add event listeners
    this.renderer.domElement.addEventListener('click', this._onClickBound);
    this.renderer.domElement.addEventListener('mousemove', this._onMoveBound);

    // Show first scenario
    this._showScenarioUI();
  }

  /** Stop the activity */
  stop() {
    this.active = false;
    this.renderer.domElement.removeEventListener('click', this._onClickBound);
    this.renderer.domElement.removeEventListener('mousemove', this._onMoveBound);

    // Clean up highlight meshes
    for (const mesh of this.highlightMeshes) {
      this.scene.remove(mesh);
      const idx = this.sm.animatedObjects.indexOf(mesh);
      if (idx > -1) this.sm.animatedObjects.splice(idx, 1);
    }
    for (const mesh of Object.values(this.clickableBuildings)) {
      this.scene.remove(mesh);
    }
    this.highlightMeshes = [];
    this.clickableBuildings = {};

    // Remove UI
    const ui = document.getElementById('activity-ui');
    if (ui) ui.remove();

    document.body.style.cursor = 'default';
  }

  _showScenarioUI() {
    let ui = document.getElementById('activity-ui');
    if (!ui) {
      ui = document.createElement('div');
      ui.id = 'activity-ui';
      document.body.appendChild(ui);
    }

    if (this.currentScenario >= this.scenarios.length) {
      // Determine message based on score
      let starRating = '';
      let mainMessage = '';
      let subMessage = '';

      if (this.score === this.scenarios.length) {
        starRating = 'star star star star';
        mainMessage = 'You Are a Community Hero!';
        subMessage = 'You got every single one right! You know exactly which community helper to call in every situation. Doctors, firefighters, police officers, and teachers - they all work together to keep our community safe, healthy, and happy. And guess what? YOU can be a community helper too! Every time you help a friend, share with someone, or do something kind, you are making your community a better place.';
      } else if (this.score >= 3) {
        starRating = 'star star star';
        mainMessage = 'Amazing Work, Future Helper!';
        subMessage = 'You really understand how community helpers keep us safe! Remember, every community helper started as a kid just like you - curious, caring, and ready to learn. Keep that big heart of yours open, and one day you might wear a doctor\'s coat, a firefighter\'s helmet, or stand in front of a classroom as a teacher.';
      } else if (this.score >= 2) {
        starRating = 'star star';
        mainMessage = 'Great Effort, Keep Going!';
        subMessage = 'You are learning so much about community helpers! The most important thing is that you tried and you are getting better. Just like community helpers practice their skills every day, you can keep learning too. Next time, you will get even more right!';
      } else {
        starRating = 'star';
        mainMessage = 'Nice Try, Keep Learning!';
        subMessage = 'Every expert was once a beginner! Community helpers train for a long time to get good at their jobs. The fact that you are here learning about them shows you have a kind heart. Keep exploring and you will know all about community helpers in no time!';
      }

      const stars = starRating.split(' ').map(() => 
        '<span class="completion-star">&#9733;</span>'
      ).join('');

      ui.innerHTML = `
        <div class="activity-panel completion-panel">
          <div class="activity-badge">Activity Complete!</div>
          <div class="completion-stars">${stars}</div>
          <h2 class="activity-title">${mainMessage}</h2>
          <p class="completion-score">You scored <strong>${this.score}</strong> out of <strong>${this.scenarios.length}</strong></p>
          <p class="completion-message">${subMessage}</p>
          <div class="completion-quote">
            <p>"A community is strong when everyone helps each other. Today you learned who to call when help is needed - and that makes YOU a very smart helper!"</p>
          </div>
          <button class="activity-btn" id="activity-close">Continue to Course</button>
        </div>
      `;
      document.getElementById('activity-close').addEventListener('click', () => {
        this.stop();
        window.location.hash = '#/2-3';
      });
      return;
    }

    const scenario = this.scenarios[this.currentScenario];
    ui.innerHTML = `
      <div class="activity-panel">
        <div class="activity-badge">Scenario ${this.currentScenario + 1} of ${this.scenarios.length}</div>
        <h2 class="activity-title">Help the Community!</h2>
        <p class="activity-text">${scenario.text}</p>
        <p class="activity-hint">Click on the correct building in the 3D scene!</p>
        <div class="activity-score">Score: ${this.score} / ${this.scenarios.length}</div>
      </div>
    `;
  }

  _showFeedback(isCorrect, message) {
    const ui = document.getElementById('activity-ui');
    if (!ui) return;

    const panel = ui.querySelector('.activity-panel');
    if (!panel) return;

    // Remove old feedback
    const old = panel.querySelector('.activity-feedback');
    if (old) old.remove();

    const fb = document.createElement('div');
    fb.className = `activity-feedback ${isCorrect ? 'correct' : 'wrong'}`;
    fb.textContent = message;
    panel.appendChild(fb);

    if (isCorrect) {
      this.score++;
      this.currentScenario++;
      setTimeout(() => this._showScenarioUI(), 1800);
    }
  }

  _onClick(event) {
    if (!this.active) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const targets = Object.values(this.clickableBuildings);
    const intersects = this.raycaster.intersectObjects(targets);

    if (intersects.length > 0) {
      const clickedName = intersects[0].object.userData.buildingName;
      const scenario = this.scenarios[this.currentScenario];

      if (clickedName === scenario.correct) {
        this._showFeedback(true, scenario.feedback);
      } else {
        this._showFeedback(false, scenario.wrong);
      }
    }
  }

  _onMouseMove(event) {
    if (!this.active) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const targets = Object.values(this.clickableBuildings);
    const intersects = this.raycaster.intersectObjects(targets);

    document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
  }
}
