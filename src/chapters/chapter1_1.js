export const chapter1_1 = {
  moduleNum: 1,
  title: 'Welcome to Our Community',
  subtitle: 'Meet the helpers who make our community a safe and happy place',
  sceneArea: 'overview',
  getHTML() {
    return `
      <!-- Header card - transparent -->
      <div class="topic-card header-card">
        <span class="module-badge module-1">Module 1 - Chapter 1</span>
        <h1>Welcome to Our Community</h1>
        <div class="chapter-images" style="margin: 10px 0;"><img src="/images/info_welcome.png" alt="Welcome to Community" style="max-width: 100%; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" /></div>
        <p class="chapter-subtitle">Meet the helpers who make our community a safe and happy place</p>
        <p>Every day, there are special people in our community who work hard to help us. They keep us safe, healthy, and happy. These people are called <strong>Community Helpers</strong>.</p>
      </div>

      <!-- Who Are Community Helpers -->
      <div class="topic-card">
        <h2>Who Are Community Helpers?</h2>
        <p>Community helpers are people who do important jobs to make our community a better place to live. Let us learn about some of them.</p>

        <div class="helpers-grid">
          <div class="pointer-item">
            <img src="/images/doctor.png" alt="Doctor helping a patient" />
            <div class="pointer-text">
              <strong>Doctor</strong>
              <p>When you feel sick, the doctor checks you and gives you medicine to feel better. Doctors work in hospitals and clinics.</p>
            </div>
          </div>

          <div class="pointer-item">
            <img src="/images/firefighter.png" alt="Firefighter putting out fire" />
            <div class="pointer-text">
              <strong>Firefighter</strong>
              <p>Firefighters are very brave. They rush to put out fires and rescue people from dangerous situations.</p>
            </div>
          </div>

          <div class="pointer-item">
            <img src="/images/police.png" alt="Police officer" />
            <div class="pointer-text">
              <strong>Police Officer</strong>
              <p>Police officers keep our streets safe. They help catch bad people and make sure everyone follows the rules.</p>
            </div>
          </div>

          <div class="pointer-item">
            <img src="/images/teacher.png" alt="Teacher in classroom" />
            <div class="pointer-text">
              <strong>Teacher</strong>
              <p>Teachers help us learn new things every day. They teach reading, writing, math, and many other subjects in school.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Where Do We Find Them -->
      <div class="topic-card">
        <h2>Where Do We Find Them?</h2>
        <ul>
          <li><strong>Doctors</strong> work at hospitals and clinics</li>
          <li><strong>Firefighters</strong> work at fire stations</li>
          <li><strong>Police Officers</strong> work at police stations</li>
          <li><strong>Teachers</strong> work at schools</li>
          <li><strong>Postal Workers</strong> work at post offices</li>
        </ul>
        <p>Look around our beautiful community scene behind the cards to spot these places. In the next chapter, we will watch a fun video about community helpers.</p>
      </div>
    `;
  },
};
