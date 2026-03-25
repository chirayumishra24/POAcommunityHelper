export const chapter2_3 = {
  moduleNum: 2,
  title: 'Key Takeaways',
  subtitle: 'Everything you have learned about community helpers',
  sceneArea: 'overview',
  getHTML() {
    return `
      <!-- Header card -->
      <div class="topic-card header-card">
        <span class="module-badge module-2">Module 2 - Chapter 3</span>
        <h1>Key Takeaways</h1>
        <p class="chapter-subtitle">Everything you have learned about community helpers</p>
        <p>You have done an amazing job learning about community helpers. Let us review the most important things you have learned.</p>
      </div>

      <!-- Takeaway grid card -->
      <div class="topic-card">
        <h2>What You Should Remember</h2>
        <div class="takeaway-grid">
          <div class="takeaway-card">
            <div class="takeaway-icon">1</div>
            <div class="takeaway-title">Helpers Are Everywhere</div>
            <div class="takeaway-desc">Community helpers are all around us, working every day to keep us safe and happy.</div>
          </div>
          <div class="takeaway-card">
            <div class="takeaway-icon">2</div>
            <div class="takeaway-title">Each Has a Role</div>
            <div class="takeaway-desc">Every community helper has a special role. Doctors heal, firefighters rescue, teachers educate.</div>
          </div>
          <div class="takeaway-card">
            <div class="takeaway-icon">3</div>
            <div class="takeaway-title">They Use Special Tools</div>
            <div class="takeaway-desc">Community helpers use special tools and equipment to do their jobs well.</div>
          </div>
          <div class="takeaway-card">
            <div class="takeaway-icon">4</div>
            <div class="takeaway-title">They Work Together</div>
            <div class="takeaway-desc">Community helpers often work together. A firefighter and ambulance driver may arrive at the same emergency.</div>
          </div>
          <div class="takeaway-card">
            <div class="takeaway-icon">5</div>
            <div class="takeaway-title">We Can Help Too</div>
            <div class="takeaway-desc">Even kids can be community helpers by being kind, following rules, and helping others.</div>
          </div>
          <div class="takeaway-card">
            <div class="takeaway-icon">6</div>
            <div class="takeaway-title">Say Thank You</div>
            <div class="takeaway-desc">Always remember to thank community helpers for the important work they do every day.</div>
          </div>
        </div>
      </div>

      <!-- What You Learned -->
      <div class="topic-card">
        <h2>What You Learned</h2>
        <ol>
          <li>You identified different community helpers and their roles</li>
          <li>You learned where these helpers work</li>
          <li>You watched a video about community helpers in action</li>
          <li>You solved real-life scenarios by picking the right helper</li>
          <li>You did a fun roleplay activity pretending to be a helper</li>
        </ol>
      </div>

      <!-- Extra Challenge -->
      <div class="topic-card">
        <h2>Extra Challenge</h2>
        <div class="brownie-box">
          <div class="brownie-title">Become a Community Helper for a Day</div>
          <p>Try to be a community helper for one day. Help your family at home, be kind to your classmates, or pick up litter in your neighborhood. Write about your experience and share it with your class.</p>
        </div>
      </div>

      <!-- Riddle -->
      <div class="topic-card">
        <h2>Riddle Time</h2>
        <p>Test your brain with a fun riddle about community helpers.</p>
        <a href="https://www.riddles.com" target="_blank" class="riddle-link" id="riddle-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
          Solve Riddles
        </a>
        <p style="margin-top: 16px;">Congratulations on completing the Community Helper Roleplay Activity. You are now a Community Helper expert.</p>
      </div>
    `;
  },
};
