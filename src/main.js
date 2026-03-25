import { SceneManager } from './scene/SceneManager.js';
import { CommunityScene } from './scene/CommunityScene.js';
import { Router } from './router.js';
import { ContentOverlay } from './ui/ContentOverlay.js';
import { CommunityActivity } from './ui/CommunityActivity.js';

import { chapter1_1 } from './chapters/chapter1_1.js';
import { chapter1_2 } from './chapters/chapter1_2.js';
import { chapter1_3 } from './chapters/chapter1_3.js';
import { chapter2_1 } from './chapters/chapter2_1.js';
import { chapter2_2 } from './chapters/chapter2_2.js';
import { chapter2_3 } from './chapters/chapter2_3.js';
import { chapter2_activity } from './chapters/chapter2_activity.js';

// Chapter registry
const chapters = {
  '1-1': chapter1_1,
  '1-2': chapter1_2,
  '1-3': chapter1_3,
  '2-1': chapter2_1,
  '2-2': chapter2_2,
  '2-activity': chapter2_activity,
  '2-3': chapter2_3,
};

// Init
const canvas = document.getElementById('scene-canvas');
const sceneManager = new SceneManager(canvas);
const communityScene = new CommunityScene(sceneManager);
const overlay = new ContentOverlay('content-overlay');
const router = new Router();
const activity = new CommunityActivity(sceneManager);

// Chapter change handler
const overlayEl = document.getElementById('content-overlay');

router.onChange((route) => {
  // Stop activity if still active
  if (activity.active) {
    activity.stop();
  }

  // Always restore overlay visibility (activity may have hidden it)
  overlayEl.style.display = '';
  overlayEl.style.pointerEvents = '';
  canvas.style.pointerEvents = '';
  canvas.style.zIndex = '';

  const chapter = chapters[route];
  if (chapter) {
    overlay.show(chapter);
    sceneManager.transitionToChapter(route);
  }
});

// Listen for activity start
window.addEventListener('startCommunityActivity', () => {
  // Hide content overlay completely so clicks reach the canvas
  overlayEl.innerHTML = '';
  overlayEl.style.display = 'none';
  // Enable pointer events on the canvas
  canvas.style.pointerEvents = 'auto';
  canvas.style.zIndex = '5';
  // Start the 3D activity
  activity.start();
});

// Start
sceneManager.start();
router.start();

// Fullscreen logic
const fullscreenBtn = document.getElementById('fullscreen-btn');
if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      fullscreenBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>';
    } else {
      fullscreenBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>';
    }
  });
}
