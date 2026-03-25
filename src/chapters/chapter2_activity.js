export const chapter2_activity = {
  moduleNum: 2,
  title: 'Help the Community - 3D Activity',
  subtitle: 'Click on the right building to send help where it is needed',
  sceneArea: 'overview',
  isActivity: true,
  getHTML() {
    return `
      <!-- Header card -->
      <div class="topic-card header-card">
        <span class="module-badge module-2">Module 2 - Activity</span>
        <h1>Help the Community!</h1>
        <p class="chapter-subtitle">A 3D interactive activity - match the helper to the right building</p>
        <p>In this activity, you will see different emergency scenarios. Your job is to click on the correct building in the 3D scene behind this card. Ready? Click the button below to start!</p>
      </div>

      <div class="topic-card" style="text-align:center;">
        <h2>How to Play</h2>
        <ol>
          <li>Read the scenario that appears on screen</li>
          <li>Look at the 3D community scene behind the cards</li>
          <li>Click on the correct building (Hospital, Fire Station, School, or Police Station)</li>
          <li>Get all 4 scenarios right for a perfect score!</li>
        </ol>
        <button class="activity-start-btn" id="start-activity-btn">Start the Activity</button>
      </div>
    `;
  },
  onMount() {
    const btn = document.getElementById('start-activity-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        // Dispatch custom event that main.js listens for
        window.dispatchEvent(new CustomEvent('startCommunityActivity'));
      });
    }
  },
};
