export const chapter2_1 = {
  moduleNum: 2,
  title: 'Problem Statement - Community in Trouble',
  subtitle: 'A day in the community when things go wrong and helpers are needed',
  sceneArea: 'firestation',
  getHTML() {
    return `
      <!-- Header card -->
      <div class="topic-card header-card">
        <span class="module-badge module-2">Module 2 - Chapter 1</span>
        <h1>Community in Trouble</h1>
        <p class="chapter-subtitle">A day in the community when things go wrong and helpers are needed</p>
        <div class="challenge-box">
          <div class="challenge-title">The Challenge</div>
          <p>Imagine you wake up one morning and many things are going wrong in your community. People need help and only the right community helpers can save the day.</p>
        </div>
      </div>

      <!-- Scenarios card 1 -->
      <div class="topic-card">
        <h2>What Happened?</h2>
        <div class="step-card">
          <div class="step-number">Scenario 1</div>
          <div class="step-title">Fire in the Kitchen</div>
          <img src="/images/scenario_fire.png" alt="Fire in kitchen" style="width: 100%; height: auto; display: block; margin: 16px 0; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
          <p>Mrs. Sharma was cooking breakfast when a fire started in her kitchen. The flames are getting bigger. Who should she call for help?</p>
        </div>
        <div class="step-card">
          <div class="step-number">Scenario 2</div>
          <div class="step-title">A Child Falls Ill</div>
          <img src="/images/scenario_sick.png" alt="Sick child" style="width: 100%; height: auto; display: block; margin: 16px 0; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
          <p>Little Rohan has a very high fever and is feeling very weak. His mother is worried. Where should she take him? Who can help Rohan feel better?</p>
        </div>
      </div>

      <!-- Scenarios card 2 -->
      <div class="topic-card">
        <div class="step-card">
          <div class="step-number">Scenario 3</div>
          <div class="step-title">Stolen Bicycle</div>
          <img src="/images/scenario_bicycle.png" alt="Stolen Bicycle" style="width: 100%; height: auto; display: block; margin: 16px 0; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
          <p>Priya parked her bicycle outside the shop, but when she came back it was gone. Someone took it. Who should Priya go to for help?</p>
        </div>
        <div class="step-card">
          <div class="step-number">Scenario 4</div>
          <div class="step-title">Lost in the Market</div>
          <img src="/images/scenario_lost.png" alt="Lost in Market" style="width: 100%; height: auto; display: block; margin: 16px 0; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
          <p>A young child got separated from their parents in the busy market. The child is crying and scared. Who can help find the parents?</p>
        </div>
      </div>

      <!-- Think About It -->
      <div class="topic-card">
        <h2>Think About It</h2>
        <p>For each scenario above, think about which community helper would come to the rescue. In the next chapter, you will get to roleplay as these helpers and solve these problems.</p>
      </div>
    `;
  },
};
