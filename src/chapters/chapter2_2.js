export const chapter2_2 = {
  moduleNum: 2,
  title: 'Roleplay - Be the Helper',
  subtitle: 'Step into the shoes of a community helper and solve the problems',
  sceneArea: 'police',
  getHTML() {
    return `
      <!-- Header card -->
      <div class="topic-card header-card">
        <span class="module-badge module-2">Module 2 - Chapter 2</span>
        <h1>Roleplay - Be the Helper</h1>
        <p class="chapter-subtitle">Step into the shoes of a community helper and solve the problems</p>
        <p>Now it is your turn. For each problem from the previous chapter, you will pretend to be the community helper who can save the day.</p>
      </div>

      <!-- Instructions -->
      <div class="topic-card">
        <h2>Activity Instructions</h2>
        <ol>
          <li>Read the scenario carefully</li>
          <li>Decide which community helper is needed</li>
          <li>Pretend to be that helper and describe what you would do</li>
          <li>Tell your classmates or parents about your rescue mission</li>
        </ol>
      </div>

      <!-- Roleplay 1: Firefighter -->
      <div class="topic-card">
        <div class="step-card">
          <div class="step-number">Roleplay 1</div>
          <div class="step-title">Be the Firefighter</div>
          <img src="/images/roleplay_firefighter.png" alt="Firefighter Roleplay" style="width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin: 16px 0; display: block;" />
          <p>You are a firefighter. Mrs. Sharma's kitchen is on fire. What will you do?</p>
          <ul>
            <li>Put on your safety gear (helmet, fireproof suit, boots)</li>
            <li>Rush to the fire truck and drive to the house</li>
            <li>Use the water hose to spray water on the fire</li>
            <li>Make sure everyone is safely out of the house</li>
            <li>Check that the fire is completely out</li>
          </ul>
        </div>
      </div>

      <!-- Roleplay 2: Doctor -->
      <div class="topic-card">
        <div class="step-card">
          <div class="step-number">Roleplay 2</div>
          <div class="step-title">Be the Doctor</div>
          <img src="/images/roleplay_doctor.png" alt="Doctor Roleplay" style="width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin: 16px 0; display: block;" />
          <p>You are a doctor. Little Rohan comes to the hospital with a high fever. How will you help?</p>
          <ul>
            <li>Greet Rohan and his mother with a warm smile</li>
            <li>Check his temperature with a thermometer</li>
            <li>Listen to his heartbeat with a stethoscope</li>
            <li>Give him the right medicine</li>
            <li>Tell his mother to make sure he rests and drinks lots of water</li>
          </ul>
        </div>
      </div>

      <!-- Roleplay 3: Police -->
      <div class="topic-card">
        <div class="step-card">
          <div class="step-number">Roleplay 3</div>
          <div class="step-title">Be the Police Officer</div>
          <img src="/images/roleplay_police.png" alt="Police Roleplay" style="width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin: 16px 0; display: block;" />
          <p>You are a police officer. Priya reports that her bicycle was stolen. What steps will you take?</p>
          <ul>
            <li>Listen to Priya's complaint carefully</li>
            <li>Write down the details about the bicycle (color, size)</li>
            <li>Check the shop's security camera footage</li>
            <li>Search the area for clues</li>
            <li>Find the bicycle and return it to Priya</li>
          </ul>
        </div>
      </div>

      <!-- Brownie Points -->
      <div class="topic-card">
        <div class="brownie-box">
          <div class="brownie-title">Brownie Points</div>
          <p>Can you think of any other community helpers who might be needed? What about an <strong>ambulance driver</strong> rushing Rohan to the hospital, or a <strong>crossing guard</strong> helping the lost child cross the street safely?</p>
        </div>
      </div>

      <!-- Upload card -->
      <div class="topic-card">
        <h2>Share Your Experience</h2>
        <p>After completing the roleplay, share your experience. What did it feel like to be a community helper? Was it easy or hard? What was the best part?</p>

        <h3>Upload Your Work</h3>
        <p>Record yourself doing the roleplay or draw a picture of you as a community helper, then upload it to the LMS.</p>

        <div class="lms-grid">
          <div class="lms-item">
            <div class="lms-icon">V</div>
            <div class="lms-text">Video Recording</div>
          </div>
          <div class="lms-item">
            <div class="lms-icon">D</div>
            <div class="lms-text">Drawing Upload</div>
          </div>
          <div class="lms-item">
            <div class="lms-icon">W</div>
            <div class="lms-text">Written Story</div>
          </div>
        </div>
      </div>
    `;
  },
};
